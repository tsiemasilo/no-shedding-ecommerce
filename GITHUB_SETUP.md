# GitHub Setup for No Shedding E-commerce

## Issue: Authentication Failed
GitHub requires a Personal Access Token instead of password authentication.

## Quick Fix (2 minutes):

### 1. Create Personal Access Token
1. Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name: "No Shedding Deploy"
4. Select scopes: **repo** (full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again)

### 2. Push with Token
Replace your password with the token:
```bash
git push -u origin main
```
When prompted:
- Username: tsiemasilo
- Password: **paste your token here**

## Alternative: Use SSH (Recommended)

### 1. Generate SSH Key
```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
# Press Enter for all prompts (default location and no passphrase)
```

### 2. Add SSH Key to GitHub
```bash
cat ~/.ssh/id_ed25519.pub
# Copy the output
```

Go to GitHub → Settings → SSH and GPG keys → New SSH key
- Title: "Replit Deployment"
- Key: paste the copied key

### 3. Change Remote to SSH
```bash
git remote set-url origin git@github.com:tsiemasilo/no-shedding-ecommerce.git
git push -u origin main
```

## Next Steps After Successful Push:
1. Go to netlify.com
2. Import from GitHub
3. Deploy your site

Your repository is ready at: https://github.com/tsiemasilo/no-shedding-ecommerce