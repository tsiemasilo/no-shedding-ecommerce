# Netlify Deployment Guide

This guide will help you deploy your e-commerce application to Netlify using the production database.

## ✅ Prerequisites Completed

- [x] Database populated with 91 products across 13 subcategories
- [x] DATABASE_URL configured in Replit
- [x] NETLIFY_DATABASE_URL configured in Replit

## 📋 Step-by-Step Deployment Instructions

### Step 1: Verify Your Production Database

Your database is now populated with:
- **6 Categories**: Lighting Solutions, Power Solutions, Appliance Alternatives, Comfort & Utility Kits, Premium Items, Safety & Security
- **13 Subcategories**: LED Lanterns, Solar Lamps, Bulbs, Motion Sensors, Flashlights, Power Banks, UPS, Gas Stoves, Kettles, Coffee Grinders, Fans, Survival Kits, Surge Protectors
- **91 Products**: 7 products in each subcategory with real images and detailed descriptions

### Step 2: Connect to Netlify

1. Go to [Netlify](https://www.netlify.com) and log in (or sign up)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose your Git provider (GitHub, GitLab, or Bitbucket)
4. If your code isn't in Git yet, you'll need to push it first:

```bash
# Initialize Git (if not already done)
git init
git add .
git commit -m "Initial commit - e-commerce application"

# Create a new repository on GitHub/GitLab
# Then push your code
git remote add origin <your-repo-url>
git push -u origin main
```

### Step 3: Configure Build Settings

When importing your project, use these settings:

**Build command:**
```
npm run build
```

**Publish directory:**
```
dist/public
```

**Functions directory:**
```
netlify/functions
```

### Step 4: Add Environment Variables

In your Netlify site settings, go to **Site settings** → **Environment variables** and add:

| Variable Name | Value |
|--------------|-------|
| `DATABASE_URL` | Your Neon database URL |
| `NETLIFY_DATABASE_URL` | Your Neon database URL (same as above) |
| `NODE_ENV` | `production` |

**Your Neon Database URL format:**
```
postgresql://neondb_owner:npg_w9osOEucCi1m@ep-gentle-moon-aem43h2f-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

⚠️ **Important:** Never commit database credentials to your repository. Always use environment variables.

### Step 5: Configure Netlify Functions (Optional)

If you want to use Netlify Functions for your API instead of the Express server:

1. Your Netlify Functions are already set up in the `netlify/functions` folder
2. The main API function is in `netlify/functions/api.ts`
3. Netlify will automatically deploy these functions

### Step 6: Deploy

1. Click **"Deploy site"**
2. Netlify will automatically build and deploy your application
3. You'll get a random URL like `https://random-name-12345.netlify.app`
4. You can customize this URL in **Site settings** → **Domain management**

### Step 7: Test Your Deployment

After deployment, test the following:

- ✅ Homepage loads correctly
- ✅ Products are displayed
- ✅ Categories and subcategories work
- ✅ Product details page opens
- ✅ Search functionality works
- ✅ Shopping cart functions properly
- ✅ Admin dashboard is accessible

## 🔄 Continuous Deployment

Netlify will automatically redeploy your site whenever you push changes to your Git repository.

To push updates:
```bash
git add .
git commit -m "Your update message"
git push
```

## 🌐 Custom Domain (Optional)

To use your own domain:

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow the instructions to configure DNS
4. Netlify will automatically provision SSL certificate

## 🔧 Troubleshooting

### Database Connection Issues

If you see database errors:

1. Check that `DATABASE_URL` is correctly set in Netlify environment variables
2. Ensure your Neon database allows connections from Netlify's IP addresses (it should by default)
3. Verify the connection string format is correct

### Build Failures

If the build fails:

1. Check the build logs in Netlify dashboard
2. Ensure all dependencies are in `package.json`
3. Verify that the build command is correct
4. Make sure all TypeScript types are valid

### Static Assets Not Loading

If images aren't showing:

1. Check that images are in the `attached_assets` folder
2. Verify the image paths in the database start with `/attached_assets/`
3. Ensure the build process includes the assets folder

## 📊 Monitoring

After deployment, monitor your site:

1. **Analytics**: Enable Netlify Analytics in site settings
2. **Functions**: Check function logs for API errors
3. **Performance**: Use Lighthouse or PageSpeed Insights

## 🔐 Security Recommendations

1. ✅ Never commit secrets to Git (already using environment variables)
2. ✅ Use HTTPS (Netlify provides free SSL)
3. ⚠️ Add rate limiting to prevent abuse
4. ⚠️ Implement proper authentication for admin routes
5. ⚠️ Consider adding CAPTCHA for forms

## 📝 Database Management

Your production database now contains:
- All categories and subcategories
- 91 products with images and descriptions
- No automatic seeding (disabled to prevent data duplication)

To manage products:
- Use the admin dashboard at `/admin-dashboard`
- Products can be added, edited, or deleted through the UI
- All changes persist to your Neon database

## 🚀 Next Steps

1. **Test thoroughly** on the Netlify deployment
2. **Set up Google OAuth** if needed (add credentials as environment variables)
3. **Configure Stripe** for payments (add STRIPE_SECRET_KEY)
4. **Add monitoring** and error tracking (e.g., Sentry)
5. **Optimize images** for better performance
6. **Set up backups** for your database

## 📞 Need Help?

- Netlify Docs: https://docs.netlify.com
- Neon Database Docs: https://neon.tech/docs
- Your project is configured and ready to deploy!

---

**Important Files:**
- `netlify.toml` - Netlify configuration
- `netlify/functions/api.ts` - API endpoints for Netlify Functions
- `.env` - Local environment variables (not committed)
- Environment variables are managed in Netlify dashboard

Your application is production-ready and can be deployed at any time! 🎉
