import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import { authenticateToken, generateToken, AuthRequest } from "./middleware/auth";
import { upload, fileToBase64 } from "./middleware/upload";
import {
  AdminUserModel,
  ProjectModel,
  UpdateModel,
  BotInfoModel,
  ContactMessageModel,
} from "./db/models";
import { generateSlug } from "./utils/slug";

export async function registerRoutes(app: Express): Promise<Server> {
  const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

  // Auth Routes
  app.post(
    "/api/auth/login",
    [
      body("email").isEmail(),
      body("password").isLength({ min: 8 }),
    ],
    validate,
    async (req: Request, res: Response) => {
      try {
        const { email, password } = req.body;

        const user = await AdminUserModel.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const validPassword = await bcrypt.compare(password, user.passwordHash);
        if (!validPassword) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id.toString());
        res.json({ token });
      } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
      }
    }
  );

  // Project Routes
  app.get("/api/projects", async (req: Request, res: Response) => {
    try {
      const projects = await ProjectModel.find().sort({ createdAt: -1 });
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get("/api/projects/:slug", async (req: Request, res: Response) => {
    try {
      const project = await ProjectModel.findOne({ slug: req.params.slug });
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.post(
    "/api/projects",
    authenticateToken,
    [
      body("title").notEmpty(),
      body("description").notEmpty(),
      body("stack").isArray(),
    ],
    validate,
    async (req: Request, res: Response) => {
      try {
        const slug = generateSlug(req.body.title);
        const project = await ProjectModel.create({
          ...req.body,
          slug,
        });
        res.status(201).json(project);
      } catch (error) {
        console.error("Create project error:", error);
        res.status(500).json({ message: "Server error" });
      }
    }
  );

  app.put(
    "/api/projects/:id",
    authenticateToken,
    async (req: Request, res: Response) => {
      try {
        const project = await ProjectModel.findById(req.params.id);
        if (!project) {
          return res.status(404).json({ message: "Project not found" });
        }

        if (req.body.title && req.body.title !== project.title) {
          req.body.slug = generateSlug(req.body.title);
        }

        const updated = await ProjectModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        res.json(updated);
      } catch (error) {
        console.error("Update project error:", error);
        res.status(500).json({ message: "Server error" });
      }
    }
  );

  app.delete(
    "/api/projects/:id",
    authenticateToken,
    async (req: Request, res: Response) => {
      try {
        await ProjectModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Project deleted" });
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
    }
  );

  // Update/Blog Routes
  app.get("/api/updates", async (req: Request, res: Response) => {
    try {
      const updates = await UpdateModel.find().sort({ createdAt: -1 });
      res.json(updates);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get("/api/updates/:slug", async (req: Request, res: Response) => {
    try {
      const update = await UpdateModel.findOne({ slug: req.params.slug });
      if (!update) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(update);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.post(
    "/api/updates",
    authenticateToken,
    [
      body("title").notEmpty(),
      body("contentMarkdown").notEmpty(),
      body("tags").isArray(),
    ],
    validate,
    async (req: Request, res: Response) => {
      try {
        const slug = generateSlug(req.body.title);
        const updateData: any = {
          ...req.body,
          slug,
        };

        if (req.body.published) {
          updateData.publishedAt = new Date();
        }

        const update = await UpdateModel.create(updateData);
        res.status(201).json(update);
      } catch (error) {
        console.error("Create update error:", error);
        res.status(500).json({ message: "Server error" });
      }
    }
  );

  app.put(
    "/api/updates/:id",
    authenticateToken,
    async (req: Request, res: Response) => {
      try {
        const update = await UpdateModel.findById(req.params.id);
        if (!update) {
          return res.status(404).json({ message: "Post not found" });
        }

        if (req.body.title && req.body.title !== update.title) {
          req.body.slug = generateSlug(req.body.title);
        }

        // Set publishedAt when publishing for the first time
        if (req.body.published && !update.published) {
          req.body.publishedAt = new Date();
        }

        const updated = await UpdateModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        res.json(updated);
      } catch (error) {
        console.error("Update update error:", error);
        res.status(500).json({ message: "Server error" });
      }
    }
  );

  app.delete(
    "/api/updates/:id",
    authenticateToken,
    async (req: Request, res: Response) => {
      try {
        await UpdateModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deleted" });
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
    }
  );

  // Bot Info Routes
  app.get("/api/bot", async (req: Request, res: Response) => {
    try {
      const botInfo = await BotInfoModel.findOne();
      if (!botInfo) {
        return res.status(404).json({ message: "Bot info not found" });
      }
      res.json(botInfo);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.put(
    "/api/bot",
    authenticateToken,
    [
      body("name").notEmpty(),
      body("tagline").notEmpty(),
      body("description").notEmpty(),
      body("githubRepo").isURL(),
    ],
    validate,
    async (req: Request, res: Response) => {
      try {
        let botInfo = await BotInfoModel.findOne();
        
        if (botInfo) {
          botInfo = await BotInfoModel.findByIdAndUpdate(
            botInfo._id,
            req.body,
            { new: true }
          );
        } else {
          botInfo = await BotInfoModel.create(req.body);
        }

        res.json(botInfo);
      } catch (error) {
        console.error("Update bot info error:", error);
        res.status(500).json({ message: "Server error" });
      }
    }
  );

  // Image Upload Route (Base64)
  app.post(
    "/api/upload",
    authenticateToken,
    upload.single("image"),
    async (req: Request, res: Response) => {
      try {
        if (!req.file) {
          return res.status(400).json({ message: "No file uploaded" });
        }

        // Convert to base64 data URL
        const base64Image = fileToBase64(req.file);
        
        res.json({ url: base64Image });
      } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: "Upload failed" });
      }
    }
  );

  // Contact Message Routes
  app.get("/api/contact", authenticateToken, async (req: Request, res: Response) => {
    try {
      const messages = await ContactMessageModel.find().sort({ createdAt: -1 });
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.post(
    "/api/contact",
    [
      body("name").notEmpty(),
      body("email").isEmail(),
      body("message").isLength({ min: 10 }),
    ],
    validate,
    async (req: Request, res: Response) => {
      try {
        const message = await ContactMessageModel.create(req.body);
        res.status(201).json(message);
      } catch (error) {
        console.error("Create message error:", error);
        res.status(500).json({ message: "Server error" });
      }
    }
  );

  app.patch(
    "/api/contact/:id",
    authenticateToken,
    async (req: Request, res: Response) => {
      try {
        const message = await ContactMessageModel.findByIdAndUpdate(
          req.params.id,
          { status: req.body.status },
          { new: true }
        );
        if (!message) {
          return res.status(404).json({ message: "Message not found" });
        }
        res.json(message);
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
    }
  );

  const httpServer = createServer(app);

  return httpServer;
}
