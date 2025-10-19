import { z } from "zod";

export const adminUserSchema = z.object({
  _id: z.string().optional(),
  email: z.string().email(),
  passwordHash: z.string(),
  createdAt: z.union([z.string(), z.date()]).optional().transform(val => val ? new Date(val) : undefined),
});

export const insertAdminUserSchema = adminUserSchema.omit({ _id: true, createdAt: true });
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type AdminUser = z.infer<typeof adminUserSchema>;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;

export const projectSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  stack: z.array(z.string()),
  images: z.array(z.string()),
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  createdAt: z.union([z.string(), z.date()]).optional().transform(val => val ? new Date(val) : undefined),
});

export const insertProjectSchema = projectSchema.omit({ _id: true, createdAt: true, slug: true });
export const updateProjectSchema = insertProjectSchema.partial();

export type Project = z.infer<typeof projectSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type UpdateProject = z.infer<typeof updateProjectSchema>;

export const updateSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1),
  slug: z.string().min(1),
  contentMarkdown: z.string().min(1),
  tags: z.array(z.string()),
  published: z.boolean().default(false),
  publishedAt: z.union([z.string(), z.date()]).optional().nullable().transform(val => val ? new Date(val) : null),
  createdAt: z.union([z.string(), z.date()]).optional().transform(val => val ? new Date(val) : undefined),
});

export const insertUpdateSchema = updateSchema.omit({ _id: true, createdAt: true, slug: true, publishedAt: true });
export const updateUpdateSchema = insertUpdateSchema.partial();

export type Update = z.infer<typeof updateSchema>;
export type InsertUpdate = z.infer<typeof insertUpdateSchema>;
export type UpdateUpdate = z.infer<typeof updateUpdateSchema>;

export const botInfoSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  demoUrl: z.string().url().optional().or(z.literal("")),
  githubRepo: z.string().url(),
  screenshots: z.array(z.string()),
  features: z.array(z.string()),
});

export const insertBotInfoSchema = botInfoSchema.omit({ _id: true });
export const updateBotInfoSchema = insertBotInfoSchema.partial();

export type BotInfo = z.infer<typeof botInfoSchema>;
export type InsertBotInfo = z.infer<typeof insertBotInfoSchema>;
export type UpdateBotInfo = z.infer<typeof updateBotInfoSchema>;

export const contactMessageSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10),
  status: z.enum(["new", "read", "replied"]).default("new"),
  createdAt: z.union([z.string(), z.date()]).optional().transform(val => val ? new Date(val) : undefined),
});

export const insertContactMessageSchema = contactMessageSchema.omit({ _id: true, createdAt: true, status: true });

export type ContactMessage = z.infer<typeof contactMessageSchema>;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
