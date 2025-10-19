# 🚀 Personal Portfolio Web App

A production-ready, full-stack personal portfolio application with MongoDB database, admin dashboard, and multi-platform deployment support.

## ✨ Features

### Public Site
- **Home**: Eye-catching hero section with animated background and featured projects
- **About**: Bio, skills showcase, and professional timeline
- **Projects**: Filterable project gallery with tech stack badges
- **Amazing Bot**: Dedicated showcase page for your flagship bot project
- **Blog**: Dynamic blog with Markdown support, tags, and search
- **Contact**: Form with message management in admin dashboard

### Admin Dashboard
- **Secure Authentication**: JWT-based auth with bcrypt password hashing
- **Project Management**: Full CRUD operations with image uploads
- **Blog Management**: Create, edit, and publish blog posts with Markdown
- **Bot Info Management**: Update bot showcase content
- **Message Management**: View and manage contact form submissions
- **Dark/Light Theme**: Persisted theme preference across sessions

### Technical Highlights
- ⚡ **Modern Stack**: React + Vite, Node.js + Express, MongoDB + Mongoose
- 🎨 **Beautiful UI**: Tailwind CSS + shadcn/ui components with Framer Motion animations
- 🔒 **Secure**: JWT authentication, input validation, helmet security headers
- 📱 **Responsive**: Mobile-first design that works on all devices
- ♿ **Accessible**: WCAG compliant with keyboard navigation
- 🔍 **SEO Optimized**: Meta tags, Open Graph, sitemap.xml, robots.txt
- 🚀 **Multi-Platform**: Deploy to Render, Koyeb, Netlify, or Replit

## 🛠 Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for blazing-fast builds
- Tailwind CSS + shadcn/ui
- Framer Motion for animations
- TanStack Query for data fetching
- React Hook Form + Zod validation
- Wouter for routing

**Backend:**
- Node.js + Express
- MongoDB + Mongoose ODM
- JWT authentication
- bcrypt for password hashing
- Express Validator
- Helmet for security
- CORS enabled

## 📋 Prerequisites

- Node.js 20.x or higher
- MongoDB Atlas account (free tier works great)
- Git

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd portfolio
npm install
```

### 2. Environment Setup

Create your environment variables by copying the example file:

```bash
cp .env.example .env
```

Edit `.env` and fill in your values:

```env
# Required
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
JWT_SECRET=your-super-secret-random-string-min-32-chars
ADMIN_EMAIL=your@email.com
ADMIN_PASSWORD=YourSecurePassword123!

# Optional
PORT=5000
NODE_ENV=development
```

**Important**: Generate a strong JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5000` to see your portfolio!

The first time you run the app, it will automatically:
- Connect to MongoDB
- Create the admin user
- Seed default bot info

### 4. Access Admin Dashboard

1. Navigate to `/admin`
2. Login with your `ADMIN_EMAIL` and `ADMIN_PASSWORD`
3. Start adding projects, blog posts, and updating bot info!

## 📦 Production Build

```bash
npm run build
npm run start
```

## 🌐 Deployment Guides

### Deploy to Render

Render offers a free tier perfect for portfolios with MongoDB support.

**Steps:**

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Create Render Web Service:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Use these settings:
     - **Name**: portfolio (or your preferred name)
     - **Runtime**: Node
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm run start`
     - **Plan**: Free

3. **Add Environment Variables:**
   - In your service settings, go to "Environment"
   - Add these variables:
     ```
     MONGODB_URI=<your-mongodb-connection-string>
     JWT_SECRET=<generate-a-random-secret>
     ADMIN_EMAIL=<your-admin-email>
     ADMIN_PASSWORD=<your-admin-password>
     NODE_ENV=production
     ```

4. **Deploy:**
   - Render will automatically deploy
   - Access your site at `https://portfolio.onrender.com`

**Configuration File:** `render.yaml` is already included in this repo.

---

### Deploy to Koyeb

Koyeb provides global edge deployment with a generous free tier.

**Steps:**

1. **Push to GitHub** (if you haven't already)

2. **Create Koyeb Account:**
   - Sign up at [Koyeb](https://www.koyeb.com/)

3. **Create New App:**
   - Click "Create App"
   - Select "GitHub" as source
   - Choose your repository
   - Use these settings:
     - **Builder**: Buildpack
     - **Build command**: `npm install && npm run build`
     - **Run command**: `npm run start`
     - **Port**: 5000

4. **Add Secrets:**
   - Go to "Secrets" in Koyeb dashboard
   - Create these secrets:
     - `mongodb-uri`: Your MongoDB connection string
     - `jwt-secret`: Random string for JWT
     - `admin-email`: Your admin email
     - `admin-password`: Your admin password

5. **Environment Variables:**
   - In app settings, add environment variables pointing to secrets:
     ```
     MONGODB_URI -> @mongodb-uri
     JWT_SECRET -> @jwt-secret
     ADMIN_EMAIL -> @admin-email
     ADMIN_PASSWORD -> @admin-password
     NODE_ENV=production
     PORT=5000
     ```

6. **Deploy:**
   - Koyeb will build and deploy automatically
   - Access your site at the provided Koyeb URL

**Configuration File:** `koyeb.yaml` is included.

---

### Deploy to Netlify

Netlify is great for frontend-focused deployments. Note: For full backend functionality, consider Render or Koyeb instead.

**Note:** Netlify Functions have limitations with MongoDB connections. This deployment method is experimental.

**Steps:**

1. **Push to GitHub**

2. **Connect to Netlify:**
   - Go to [Netlify](https://www.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

3. **Build Settings:**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/public`
   - **Functions directory**: `dist`

4. **Environment Variables:**
   - In Site settings → Environment variables, add:
     ```
     MONGODB_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     ADMIN_EMAIL=<your-admin-email>
     ADMIN_PASSWORD=<your-admin-password>
     NODE_ENV=production
     ```

5. **Deploy:**
   - Netlify will build and deploy
   - Access at your `.netlify.app` domain

**Configuration File:** `netlify.toml` is included.

**Limitation:** Netlify Functions may have connection limits with MongoDB. For best results, use Render or Koyeb for the backend.

---

### Deploy to Replit

Perfect for rapid prototyping and testing.

**Steps:**

1. **Import to Replit:**
   - Go to [Replit](https://replit.com/)
   - Click "Create Repl" → "Import from GitHub"
   - Enter your repository URL

2. **Set Secrets:**
   - Open the "Secrets" tool (lock icon in left sidebar)
   - Add these secrets:
     ```
     MONGODB_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     ADMIN_EMAIL=<your-admin-email>
     ADMIN_PASSWORD=<your-admin-password>
     ```

3. **Run:**
   - Click the "Run" button
   - Replit will install dependencies and start the server
   - Access your site via the Webview panel

4. **Deploy (Optional):**
   - Click "Deploy" in the top right
   - Choose "Autoscale" deployment
   - Get a permanent `.replit.app` domain

**Auto-configured:** The `.replit` file is automatically managed by Replit.

---

## 🔧 Configuration

### MongoDB Setup

1. **Create MongoDB Atlas Cluster:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free M0 cluster
   - Create a database user
   - Whitelist your IP (or use `0.0.0.0/0` for all IPs in production)

2. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Replace `<dbname>` with `portfolio` (or your preferred name)

### Admin Credentials

**First Time Setup:**
- Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in your `.env` file
- The app will automatically create the admin user on first run

**Change Admin Password:**
- Use a MongoDB GUI (MongoDB Compass) or shell to update the password hash
- Or drop the admin user and restart the app to recreate it

### Adding Content

1. **Projects:**
   - Login to `/admin`
   - Go to "Projects" tab
   - Click "Add Project"
   - Fill in details, tech stack, images (use image URLs)
   - Mark as "Featured" to show on homepage

2. **Blog Posts:**
   - Go to "Blog" tab
   - Click "New Post"
   - Write content in Markdown
   - Add tags for filtering
   - Toggle "Published" when ready

3. **Bot Info:**
   - Go to "Bot Info" tab
   - Update name, tagline, description
   - Add GitHub repo URL
   - Add feature list and screenshots

## 📝 Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `MONGODB_URI` | ✅ Yes | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/portfolio` |
| `JWT_SECRET` | ✅ Yes | Secret for JWT tokens (32+ chars) | `a1b2c3d4e5f6...` |
| `ADMIN_EMAIL` | ✅ Yes | Admin login email | `admin@example.com` |
| `ADMIN_PASSWORD` | ✅ Yes | Admin login password (8+ chars) | `SecurePass123!` |
| `PORT` | ❌ No | Server port (default: 5000) | `5000` |
| `NODE_ENV` | ❌ No | Environment (`development` or `production`) | `production` |
| `ANALYTICS_ID` | ❌ No | Google Analytics / Plausible ID | `G-XXXXXXXXXX` |

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error:** "MongooseServerSelectionError: Could not connect to any servers"

**Solutions:**
1. Check your `MONGODB_URI` is correct
2. Ensure IP is whitelisted in MongoDB Atlas (Network Access)
3. Verify database user has correct permissions
4. Check if password contains special characters - URL encode them

### Authentication Not Working

**Error:** "Invalid credentials"

**Solutions:**
1. Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` match your `.env` file
2. Check if admin user was created (check MongoDB directly)
3. Try deleting the admin user document and restart app to recreate
4. Ensure password is at least 8 characters

### Build Failures

**Error:** Build command fails

**Solutions:**
1. Ensure Node.js version is 20.x or higher
2. Delete `node_modules` and `package-lock.json`, run `npm install` again
3. Check all environment variables are set correctly
4. Review build logs for specific errors

### Deployment Not Working

**Check:**
1. All environment variables are set on the platform
2. Build and start commands are correct
3. Port configuration matches your deployment platform
4. MongoDB URI is accessible from the deployment platform's IPs

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🙏 Credits

Built with:
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

**Need Help?** Open an issue on GitHub or check the troubleshooting section above.

**Want to Contribute?** Pull requests are welcome!

Made with ❤️ for developers by developers
