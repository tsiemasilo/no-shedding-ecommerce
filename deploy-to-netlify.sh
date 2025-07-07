#!/bin/bash

echo "🚀 Deploying No Shedding E-commerce to Netlify + Supabase"
echo "=================================================="

# Step 1: Build the project
echo "📦 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

# Step 2: Initialize git if needed
if [ ! -d ".git" ]; then
    echo "🔄 Initializing Git repository..."
    git init
fi

# Step 3: Add and commit files
echo "📝 Committing files to Git..."
git add .
git commit -m "Deploy No Shedding e-commerce to Netlify"

echo ""
echo "🎯 Next Steps:"
echo "1. Push to GitHub:"
echo "   git remote add origin https://github.com/YOUR-USERNAME/no-shedding-ecommerce.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "2. Deploy to Netlify:"
echo "   - Go to netlify.com"
echo "   - Import from GitHub"
echo "   - Build command: npm run build"
echo "   - Publish directory: dist/public"
echo ""
echo "3. Add Environment Variables in Netlify:"
echo "   DATABASE_URL=postgresql://postgres:0852Tsie*@db.izkihpjkykultfshgqve.supabase.co:5432/postgres"
echo "   SMTP_HOST=smtp.gmail.com"
echo "   SMTP_PORT=587"
echo "   SMTP_USER=nosheddingsupp@gmail.com"
echo "   SMTP_PASS=your-gmail-app-password"
echo ""
echo "🎉 Your site will be live with full e-commerce functionality!"