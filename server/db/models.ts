import mongoose, { Schema, Document } from "mongoose";

export interface IAdminUser extends Document {
  email: string;
  passwordHash: string;
  createdAt: Date;
}

const adminUserSchema = new Schema<IAdminUser>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const AdminUserModel =
  mongoose.models.AdminUser ||
  mongoose.model<IAdminUser>("AdminUser", adminUserSchema);

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  stack: string[];
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  createdAt: Date;
}

const projectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  stack: [{ type: String }],
  images: [{ type: String }],
  githubUrl: { type: String },
  liveUrl: { type: String },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const ProjectModel =
  mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);

export interface IUpdate extends Document {
  title: string;
  slug: string;
  contentMarkdown: string;
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
}

const updateSchema = new Schema<IUpdate>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  contentMarkdown: { type: String, required: true },
  tags: [{ type: String }],
  published: { type: Boolean, default: false },
  publishedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const UpdateModel =
  mongoose.models.Update || mongoose.model<IUpdate>("Update", updateSchema);

export interface IBotInfo extends Document {
  name: string;
  tagline: string;
  description: string;
  demoUrl?: string;
  githubRepo: string;
  screenshots: string[];
  features: string[];
}

const botInfoSchema = new Schema<IBotInfo>({
  name: { type: String, required: true },
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  demoUrl: { type: String },
  githubRepo: { type: String, required: true },
  screenshots: [{ type: String }],
  features: [{ type: String }],
});

export const BotInfoModel =
  mongoose.models.BotInfo || mongoose.model<IBotInfo>("BotInfo", botInfoSchema);

export interface IContactMessage extends Document {
  name: string;
  email: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: Date;
}

const contactMessageSchema = new Schema<IContactMessage>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ["new", "read", "replied"],
    default: "new",
  },
  createdAt: { type: Date, default: Date.now },
});

export const ContactMessageModel =
  mongoose.models.ContactMessage ||
  mongoose.model<IContactMessage>("ContactMessage", contactMessageSchema);
