#!/bin/bash

# Script to push code to GitHub repository
echo "🚀 Pushing code to GitHub..."

# Add all changes
git add .

# Check if there are changes to commit
if git diff --cached --quiet; then
    echo "✅ No changes to commit"
else
    # Commit changes
    git commit -m "Fix Netlify API: Direct database queries for product display"
    
    # Push to GitHub
    git push origin main
    
    echo "✅ Code pushed successfully to GitHub!"
    echo "📝 Now go to Netlify and trigger a 'Clear cache and deploy' to rebuild your site"
fi