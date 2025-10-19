import mongoose, { Schema, Document } from "mongoose";
import type {
  AdminUser,
  Project,
  Update,
  BotInfo,
  ContactMessage,
} from "@shared/schema";

// AdminUser Model
export interface IAdminUser extends Omit<AdminUser, "_id">, Document {}

const adminUserSchema = new Schema<IAdminUser>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const AdminUserModel =
  mongoose.models.AdminUser ||
  mongoose.model<IAdminUser>("AdminUser", adminUserSchema);

// Project Model
export interface IProject extends Omit<Project, "_id">, Document {}

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

// Update/Blog Post Model
export interface IUpdate extends Omit<Update, "_id">, Document {}

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

// BotInfo Model
export interface IBotInfo extends Omit<BotInfo, "_id">, Document {}

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

// ContactMessage Model
export interface IContactMessage extends Omit<ContactMessage, "_id">, Document {}

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
