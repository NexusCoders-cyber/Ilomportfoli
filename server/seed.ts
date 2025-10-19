import bcrypt from "bcrypt";
import { AdminUserModel, BotInfoModel } from "./db/models";
import { connectDB } from "./db/connection";

async function seedAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123456";

  try {
    // Check if admin already exists
    const existingAdmin = await AdminUserModel.findOne({ email: adminEmail });
    
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash(adminPassword, 10);
      await AdminUserModel.create({
        email: adminEmail,
        passwordHash,
      });
      console.log(`✅ Admin user created: ${adminEmail}`);
    } else {
      console.log(`ℹ️  Admin user already exists: ${adminEmail}`);
    }
  } catch (error) {
    console.error("Error seeding admin:", error);
  }
}

async function seedBotInfo() {
  try {
    const existingBot = await BotInfoModel.findOne();
    
    if (!existingBot) {
      await BotInfoModel.create({
        name: "Amazing Bot",
        tagline: "A smart assistant that makes your life easier",
        description: "Amazing Bot is an intelligent assistant built to help you automate tasks, answer questions, and boost productivity. With advanced AI capabilities and seamless integrations, it's the perfect companion for modern workflows.",
        githubRepo: "https://github.com/yourusername/amazing-bot",
        demoUrl: "",
        screenshots: [],
        features: [
          "Natural language processing for intuitive interactions",
          "Multi-platform support - works everywhere you do",
          "Customizable workflows and automation",
          "Real-time responses and instant notifications",
          "Secure and privacy-focused design",
          "Continuous learning and improvement",
        ],
      });
      console.log("✅ Bot info created with default data");
    } else {
      console.log("ℹ️  Bot info already exists");
    }
  } catch (error) {
    console.error("Error seeding bot info:", error);
  }
}

export async function seedDatabase() {
  await connectDB();
  await seedAdmin();
  await seedBotInfo();
  console.log("✅ Database seeding completed");
}

// Run seed if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Seed error:", error);
      process.exit(1);
    });
}
