import { z } from "zod";
import { pgTable, text, varchar, boolean, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  stack: text("stack").array().notNull(),
  images: text("images").array().notNull(),
  githubUrl: varchar("github_url", { length: 500 }),
  liveUrl: varchar("live_url", { length: 500 }),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const updates = pgTable("updates", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  contentMarkdown: text("content_markdown").notNull(),
  tags: text("tags").array().notNull(),
  published: boolean("published").default(false).notNull(),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const botInfos = pgTable("bot_infos", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  tagline: varchar("tagline", { length: 500 }).notNull(),
  description: text("description").notNull(),
  demoUrl: varchar("demo_url", { length: 500 }),
  githubRepo: varchar("github_repo", { length: 500 }).notNull(),
  screenshots: text("screenshots").array().notNull(),
  features: text("features").array().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: varchar("status", { length: 20 }).default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAdminUserSchema = createInsertSchema(adminUsers, {
  email: z.string().email(),
  passwordHash: z.string(),
}).omit({ id: true, createdAt: true });

export const selectAdminUserSchema = createSelectSchema(adminUsers);

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const insertProjectSchema = createInsertSchema(projects, {
  title: z.string().min(1),
  description: z.string().min(1),
  stack: z.array(z.string()),
  images: z.array(z.string()),
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().default(false),
}).omit({ id: true, createdAt: true, slug: true });

export const updateProjectSchema = insertProjectSchema.partial();
export const selectProjectSchema = createSelectSchema(projects);

export const insertUpdateSchema = createInsertSchema(updates, {
  title: z.string().min(1),
  contentMarkdown: z.string().min(1),
  tags: z.array(z.string()),
  published: z.boolean().default(false),
}).omit({ id: true, createdAt: true, slug: true, publishedAt: true });

export const updateUpdateSchema = insertUpdateSchema.partial();
export const selectUpdateSchema = createSelectSchema(updates);

export const insertBotInfoSchema = createInsertSchema(botInfos, {
  name: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  demoUrl: z.string().url().optional().or(z.literal("")),
  githubRepo: z.string().url(),
  screenshots: z.array(z.string()),
  features: z.array(z.string()),
}).omit({ id: true });

export const updateBotInfoSchema = insertBotInfoSchema.partial();
export const selectBotInfoSchema = createSelectSchema(botInfos);

export const insertContactMessageSchema = createInsertSchema(contactMessages, {
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10),
}).omit({ id: true, createdAt: true, status: true });

export const selectContactMessageSchema = createSelectSchema(contactMessages);

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type UpdateProject = z.infer<typeof updateProjectSchema>;

export type Update = typeof updates.$inferSelect;
export type InsertUpdate = z.infer<typeof insertUpdateSchema>;
export type UpdateUpdate = z.infer<typeof updateUpdateSchema>;

export type BotInfo = typeof botInfos.$inferSelect;
export type InsertBotInfo = z.infer<typeof insertBotInfoSchema>;
export type UpdateBotInfo = z.infer<typeof updateBotInfoSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
