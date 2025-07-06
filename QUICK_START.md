# Quick Start - Deploy Your No Shedding Website

Your Supabase Project: https://izkihpjkykultfshgqve.supabase.co

## Next 3 Steps (15 minutes):

### Step 1: Set Up Database (5 minutes)
1. Go to: https://izkihpjkykultfshgqve.supabase.co
2. Click **SQL Editor** → **New Query**
3. Copy ALL the SQL from `SUPABASE_SETUP.md`
4. Click **RUN** - you should see 8 tables created
5. Go to **Settings** → **Database** and copy your connection string

### Step 2: Push to GitHub (5 minutes)
```bash
git init
git add .
git commit -m "Deploy No Shedding e-commerce"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/no-shedding-ecommerce.git
git push -u origin main
```

### Step 3: Deploy to Netlify (5 minutes)
1. Go to netlify.com → "New site from Git"
2. Connect your GitHub repository
3. Build settings:
   - Build command: `vite build`
   - Publish directory: `dist/public`
4. Add environment variables:
   - `DATABASE_URL` = your Supabase connection string
   - `SMTP_HOST` = smtp.gmail.com
   - `SMTP_PORT` = 587
   - `SMTP_USER` = nosheddingsupp@gmail.com
   - `SMTP_PASS` = your Gmail app password

## Test Your Live Site:
- Visit your Netlify URL
- Go to `/admin` and login: admin / admin123
- Add products and test all features

🎉 Your e-commerce site will be live and fully functional!