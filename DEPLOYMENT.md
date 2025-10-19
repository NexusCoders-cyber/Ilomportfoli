# 🚀 Detailed Deployment Guide

This guide provides comprehensive, step-by-step instructions for deploying your portfolio to various platforms.

## Table of Contents
- [Render](#render-deployment)
- [Koyeb](#koyeb-deployment)
- [Netlify](#netlify-deployment)
- [Replit](#replit-deployment)
- [Common Issues](#common-issues)

---

## Render Deployment

### Why Render?
- ✅ Free tier includes 750 hours/month
- ✅ Automatic SSL certificates
- ✅ Easy MongoDB integration
- ✅ GitHub auto-deploy
- ✅ Great for full-stack apps

### Step-by-Step Guide

#### 1. Prepare Your Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Portfolio app"

# Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

#### 2. Create MongoDB Atlas Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Build a Database" → Choose FREE M0
3. Select a cloud provider and region (closest to Render's deployment region)
4. Create cluster (takes 3-5 minutes)
5. Create Database User:
   - Security → Database Access → Add New Database User
   - Choose "Password" authentication
   - Username: `portfoliouser`
   - Password: Generate strong password (save it!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

6. Whitelist IP:
   - Security → Network Access → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

7. Get Connection String:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Driver: Node.js, Version: 5.5 or later
   - Copy the connection string
   - It looks like: `mongodb+srv://portfoliouser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<password>` with your actual password
   - Add database name before the `?`: `mongodb+srv://portfoliouser:yourpass@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority`

#### 3. Create Render Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" in top right
3. Select "Web Service"
4. Click "Connect Account" to link GitHub
5. Select your portfolio repository
6. Configure service:

   **Basic Settings:**
   - Name: `portfolio` (or your choice)
   - Region: Choose closest to your target audience
   - Branch: `main`
   - Runtime: `Node`

   **Build & Deploy:**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start`

   **Plan:**
   - Select "Free" (750 hours/month)

7. Click "Advanced" → Add Environment Variables:

   ```
   MONGODB_URI = mongodb+srv://portfoliouser:yourpass@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   JWT_SECRET = <click "Generate" button or use: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
   ADMIN_EMAIL = your@email.com
   ADMIN_PASSWORD = YourSecurePassword123!
   NODE_ENV = production
   ```

8. Click "Create Web Service"

#### 4. Deployment

- Render will automatically start building
- Watch the logs in real-time
- First build takes 3-5 minutes
- Once complete, you'll see "Your service is live 🎉"
- Click the URL to access your portfolio!

#### 5. Auto-Deploy Setup

- Future git pushes to `main` branch automatically trigger deploys
- Check "Auto-Deploy" is enabled in Settings → Build & Deploy

### Render Tips

**Custom Domain:**
1. Settings → Custom Domains → Add Custom Domain
2. Add your domain (e.g., `portfolio.com`)
3. Update your DNS provider with Render's records
4. SSL certificate automatically provisioned

**View Logs:**
- Click on your service → "Logs" tab
- Real-time logs help debug issues

**Environment Variable Updates:**
- Changing environment variables triggers automatic redeploy
- Use this to update admin password or secrets

---

## Koyeb Deployment

### Why Koyeb?
- ✅ Global edge deployment
- ✅ Free tier: 1 web service
- ✅ Fast deployment times
- ✅ Automatic scaling

### Step-by-Step Guide

#### 1. Prepare Repository (if not done)

Follow the same git setup as Render section above.

#### 2. Create Koyeb Account

1. Go to [Koyeb](https://www.koyeb.com/)
2. Sign up with GitHub (recommended)
3. Verify email

#### 3. Create Secrets First

Before creating the app, set up secrets:

1. Go to "Secrets" in left sidebar
2. Click "Create Secret"
3. Create these secrets one by one:

   **mongodb-uri:**
   - Type: Plain text
   - Value: Your full MongoDB connection string

   **jwt-secret:**
   - Type: Plain text
   - Value: Generate using `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

   **admin-email:**
   - Type: Plain text
   - Value: Your admin email

   **admin-password:**
   - Type: Plain text
   - Value: Your secure password

#### 4. Create App

1. Click "Create App" in dashboard
2. Select "GitHub" as deployment method
3. Choose your repository
4. Configure:

   **Service Settings:**
   - Name: `portfolio`
   - Region: Select region closest to you
   - Instance: Free (Eco)

   **Builder:**
   - Builder: Buildpack
   - Build command: `npm install && npm run build`
   - Run command: `npm run start`

   **Port:**
   - Port: `5000`

   **Environment Variables:**
   ```
   NODE_ENV = production
   PORT = 5000
   MONGODB_URI = @mongodb-uri (select secret from dropdown)
   JWT_SECRET = @jwt-secret
   ADMIN_EMAIL = @admin-email
   ADMIN_PASSWORD = @admin-password
   ```

   Note: Use `@secret-name` syntax to reference secrets

5. Click "Deploy"

#### 5. Monitor Deployment

- Watch build logs in real-time
- Deployment takes 2-3 minutes
- Once complete, click the provided URL to access your site

### Koyeb Tips

**Custom Domain:**
1. Settings → Domains → Add Domain
2. Enter your domain name
3. Update DNS records at your provider
4. Certificate auto-issues

**Redeploy:**
- Settings → Redeploy button
- Useful after changing environment variables

**Logs:**
- Check "Logs" tab for debugging
- Filter by level (info, error, etc.)

---

## Netlify Deployment

### ⚠️ Important Note

Netlify is primarily designed for static sites and serverless functions. This portfolio app uses MongoDB connections which can be problematic with Netlify Functions due to:
- Cold start times
- Connection pooling issues
- Execution time limits

**Recommendation:** Use Render or Koyeb for the backend. However, if you want to try Netlify:

### Step-by-Step Guide

#### 1. Prepare Repository

Same git setup as previous sections.

#### 2. Connect to Netlify

1. Go to [Netlify](https://www.netlify.com/)
2. Sign up/login with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose GitHub, authorize, select repository

#### 3. Configure Build Settings

**Build Settings:**
- Base directory: (leave empty)
- Build command: `npm run build`
- Publish directory: `dist/public`
- Functions directory: `dist`

#### 4. Environment Variables

Before deploying, add environment variables:

1. Site settings → Build & Deploy → Environment
2. Click "Edit variables"
3. Add:
   ```
   MONGODB_URI = <your-mongodb-uri>
   JWT_SECRET = <your-jwt-secret>
   ADMIN_EMAIL = <your-admin-email>
   ADMIN_PASSWORD = <your-admin-password>
   NODE_ENV = production
   ```

#### 5. Deploy

- Click "Deploy site"
- Build takes 2-3 minutes
- Access site at random `.netlify.app` subdomain

### Netlify Limitations

**Known Issues:**
- MongoDB connection pooling doesn't work well with serverless
- Functions may time out on cold starts
- 10-second execution limit on free tier

**Alternative Approach:**
- Use Netlify for frontend only
- Deploy backend to Render/Koyeb
- Update frontend API calls to point to backend URL

---

## Replit Deployment

### Why Replit?
- ✅ Fastest setup
- ✅ Built-in IDE
- ✅ No git required
- ✅ Great for prototyping

### Step-by-Step Guide

#### 1. Import to Replit

**Option A: From GitHub**
1. Go to [Replit](https://replit.com/)
2. Click "Create Repl"
3. Choose "Import from GitHub"
4. Paste your repository URL
5. Click "Import from GitHub"

**Option B: Upload Folder**
1. Create a new Node.js Repl
2. Delete default files
3. Drag and drop your project folder
4. Replit will detect it's a Node.js project

#### 2. Set Secrets

1. Click the lock icon (🔒) in left sidebar
2. Click "New Secret" for each variable:

   ```
   MONGODB_URI = <your-mongodb-uri>
   JWT_SECRET = <generate-random-string>
   ADMIN_EMAIL = your@email.com
   ADMIN_PASSWORD = YourSecurePassword123!
   ```

3. Secrets are automatically injected as environment variables

#### 3. Install Dependencies

Replit should auto-detect and install dependencies. If not:

1. Open Shell tab
2. Run: `npm install`

#### 4. Run the App

1. Click the big green "Run" button
2. Replit runs `npm run dev` automatically
3. App opens in the Webview panel
4. Access via the URL in Webview (format: `https://portfolio-username.replit.app`)

#### 5. Deploy (Make it Always-On)

Free Repls sleep after inactivity. To keep it running:

**Option 1: Always-On (Paid Feature)**
- Replit Hacker plan ($7/month)
- Keeps Repl running 24/7

**Option 2: Replit Deployments**
1. Click "Deploy" button in top right
2. Choose deployment type:
   - **Reserved VM**: Dedicated resources, always on
   - **Autoscale**: Scales based on traffic
3. Configure:
   - Build command: `npm run build`
   - Run command: `npm run start`
4. Add environment variables (same as Secrets)
5. Deploy

**Option 3: External Ping**
- Use UptimeRobot or similar to ping your Repl every 5 minutes
- Keeps free Repl awake during active hours
- Not reliable for production

### Replit Tips

**Database Tool:**
- Replit has built-in database viewer
- However, it's designed for Replit DB, not MongoDB
- Use MongoDB Compass for better MongoDB management

**Console Logs:**
- Check "Console" tab for server logs
- Great for debugging

**Collaborate:**
- Click "Invite" to collaborate in real-time
- Share read-only link: Share → Get link

---

## Common Issues

### MongoDB Connection Failures

**Symptom:** "MongooseServerSelectionError: connect ETIMEDOUT"

**Causes & Solutions:**

1. **IP Not Whitelisted:**
   - MongoDB Atlas → Network Access → Add IP Address
   - Use `0.0.0.0/0` to allow all IPs (for deployment platforms)

2. **Wrong Connection String:**
   - Check format: `mongodb+srv://username:password@cluster.mongodb.net/dbname?options`
   - URL-encode special characters in password
   - Ensure database name is specified

3. **Database User Permissions:**
   - MongoDB Atlas → Database Access
   - Ensure user has "Read and write to any database" or specific database access

4. **Network Issues:**
   - Some platforms may have firewall restrictions
   - Try different MongoDB region
   - Check platform's IP ranges are allowed

### Build Failures

**Symptom:** Build fails with module errors

**Solutions:**

1. **Node Version Mismatch:**
   - Ensure deployment platform uses Node 20.x
   - Add to package.json: `"engines": { "node": ">=20.0.0" }`

2. **Missing Dependencies:**
   - Verify all dependencies are in `package.json`
   - Run locally: `npm install` then `npm run build`
   - Commit `package-lock.json`

3. **Build Command Issues:**
   - Double-check build command matches: `npm install && npm run build`
   - Ensure `dist` folder is created

### Authentication Issues

**Symptom:** Can't login to admin panel

**Solutions:**

1. **Admin User Not Created:**
   - Check MongoDB for `adminusers` collection
   - Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set
   - Restart server to trigger seed script

2. **JWT Secret Missing:**
   - Ensure `JWT_SECRET` environment variable is set
   - Must be same across all instances

3. **Password Mismatch:**
   - Password in `.env` must match what was used to create admin user
   - To reset: Delete admin user from MongoDB, restart app

### Deployment Platform Specific

#### Render

**Cold Starts:**
- Free tier spins down after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- Upgrade to paid tier for always-on

**Memory Limits:**
- Free tier: 512 MB RAM
- If exceeded, service crashes
- Optimize queries and limit data in memory

#### Koyeb

**Build Timeouts:**
- Free tier has 5-minute build timeout
- If builds fail, optimize your build process
- Remove large unnecessary dependencies

**Scaling:**
- Free tier doesn't auto-scale
- Upgrade for production workloads

#### Netlify

**Function Timeouts:**
- 10-second limit on free tier functions
- MongoDB operations may exceed this
- Consider splitting into smaller operations or using Render/Koyeb

#### Replit

**Sleep Mode:**
- Free Repls sleep after inactivity
- Use "Always On" (paid) or UptimeRobot pings
- Production apps should use paid deployments

---

## Production Checklist

Before going live, ensure:

- [ ] Strong `JWT_SECRET` (32+ random characters)
- [ ] Secure `ADMIN_PASSWORD` (12+ characters, mixed case, numbers, symbols)
- [ ] MongoDB user has minimal necessary permissions
- [ ] Environment variables are set on deployment platform
- [ ] MongoDB IP whitelist is correct
- [ ] All secrets are stored securely (not in code)
- [ ] HTTPS is enabled (automatic on most platforms)
- [ ] Custom domain configured (if applicable)
- [ ] Tested login and all features work
- [ ] Error handling works (try invalid data)
- [ ] Mobile responsive
- [ ] SEO meta tags are correct
- [ ] Analytics configured (if using)

---

## Getting Help

**Platform Documentation:**
- [Render Docs](https://render.com/docs)
- [Koyeb Docs](https://www.koyeb.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [Replit Docs](https://docs.replit.com/)

**MongoDB:**
- [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas/)
- [Connection String Format](https://www.mongodb.com/docs/manual/reference/connection-string/)

**This Project:**
- Check main `README.md` for quick start
- Review code comments for implementation details
- Open GitHub issue for bugs

---

**Pro Tip:** Start with Replit for testing, then move to Render or Koyeb for production deployment!

Happy deploying! 🚀
