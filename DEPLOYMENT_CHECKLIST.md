# Deployment Checklist ✅

Follow this step-by-step checklist to deploy your No Shedding e-commerce website.

## Phase 1: Supabase Setup (10 minutes)

### □ 1. Create Supabase Account
- [ ] Go to [supabase.com](https://supabase.com)
- [ ] Sign up with Google account
- [ ] Verify email if needed

### □ 2. Create New Project
- [ ] Click "New Project"
- [ ] Project name: `no-shedding-ecommerce`
- [ ] Create strong database password
- [ ] Choose region (closest to you)
- [ ] Wait for project creation (2-3 minutes)

### □ 3. Get Database URL
- [ ] Go to Settings → Database
- [ ] Copy "URI" connection string
- [ ] Replace `[YOUR-PASSWORD]` with your actual password
- [ ] Save this as your `DATABASE_URL`

### □ 4. Set Up Database
- [ ] Go to SQL Editor
- [ ] Create new query
- [ ] Copy SQL from `COMPLETE_DEPLOYMENT_GUIDE.md`
- [ ] Run the SQL to create all tables
- [ ] Verify tables were created

## Phase 2: GitHub Setup (5 minutes)

### □ 5. Create GitHub Repository
- [ ] Go to [github.com](https://github.com)
- [ ] Click "New repository"
- [ ] Name: `no-shedding-ecommerce`
- [ ] Make it Public
- [ ] Create repository

### □ 6. Push Code to GitHub
- [ ] Open terminal/shell
- [ ] Run: `git init`
- [ ] Run: `git add .`
- [ ] Run: `git commit -m "Initial commit"`
- [ ] Run: `git branch -M main`
- [ ] Run: `git remote add origin https://github.com/YOUR-USERNAME/no-shedding-ecommerce.git`
- [ ] Run: `git push -u origin main`

## Phase 3: Netlify Deployment (10 minutes)

### □ 7. Deploy to Netlify
- [ ] Go to [netlify.com](https://netlify.com)
- [ ] Sign up/login
- [ ] Click "Add new site" → "Import an existing project"
- [ ] Choose GitHub
- [ ] Select your repository
- [ ] Build command: `vite build`
- [ ] Publish directory: `dist/public`
- [ ] Click "Deploy site"

### □ 8. Add Environment Variables
- [ ] Go to Site settings → Environment variables
- [ ] Add `DATABASE_URL` (your Supabase connection string)
- [ ] Add `SMTP_HOST` = `smtp.gmail.com`
- [ ] Add `SMTP_PORT` = `587`
- [ ] Add `SMTP_USER` = `nosheddingsupp@gmail.com`
- [ ] Add `SMTP_PASS` = (your Gmail app password)

### □ 9. Set Up Gmail App Password
- [ ] Go to Google Account settings
- [ ] Security → 2-Step Verification
- [ ] App passwords → Generate password for "Mail"
- [ ] Copy password and use as `SMTP_PASS`

## Phase 4: Testing (5 minutes)

### □ 10. Test Basic Features
- [ ] Visit your Netlify site URL
- [ ] Homepage loads with categories
- [ ] Product browsing works
- [ ] Search functionality works
- [ ] Newsletter signup works
- [ ] Contact form works

### □ 11. Test Admin Dashboard
- [ ] Go to `your-site.netlify.app/admin`
- [ ] Login with username: `admin`, password: `admin123`
- [ ] Try adding a new product
- [ ] Check if categories load
- [ ] View support requests

## Phase 5: Final Setup (5 minutes)

### □ 12. Configure Domain (Optional)
- [ ] In Netlify: Domain management
- [ ] Add custom domain if desired
- [ ] Set up SSL certificate (automatic)

### □ 13. Enable Analytics (Optional)
- [ ] Enable Netlify Analytics
- [ ] Set up Google Analytics if needed

### □ 14. Set Up Monitoring
- [ ] Enable Netlify notifications
- [ ] Set up email alerts for downtime

## Troubleshooting

### If deployment fails:
1. Check build logs in Netlify
2. Verify all environment variables are set
3. Test database connection in Supabase
4. Check GitHub repository has latest code

### If admin dashboard doesn't work:
1. Verify DATABASE_URL is correct
2. Check if database tables were created
3. Test database connection in Supabase SQL Editor

### If emails don't send:
1. Verify Gmail app password is correct
2. Check SMTP settings in environment variables
3. Test email credentials in Gmail

## Success Criteria ✅

Your deployment is successful when:
- [ ] Website loads at your Netlify URL
- [ ] All pages work (home, products, categories, search)
- [ ] Admin dashboard accessible at `/admin`
- [ ] Can add products through admin interface
- [ ] Newsletter signup works
- [ ] Contact/support forms work
- [ ] Database operations work (products, categories, etc.)

## Support

If you get stuck:
1. Check the error logs in Netlify
2. Review the detailed guide in `COMPLETE_DEPLOYMENT_GUIDE.md`
3. Verify each environment variable is set correctly
4. Test your database connection in Supabase

**Estimated Total Time: 30-40 minutes**

🎉 Once complete, your e-commerce site will be live and fully functional!