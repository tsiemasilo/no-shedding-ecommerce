#!/bin/bash
echo "Pushing database connection fix to GitHub..."
git add netlify/functions/api.ts
git commit -m "Fix Supabase database connection in Netlify function"
git push origin main
echo "✅ Database fix pushed! Netlify will redeploy automatically."