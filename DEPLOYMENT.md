# Cloudflare Deployment Setup Guide

## Prerequisites

1. **Node.js v20+** ✅ (Current: v20.19.5)
2. **Cloudflare Account** - Sign up at [cloudflare.com](https://cloudflare.com)
3. **GitHub Repository** ✅ (kedster/kedster.github.io)

## Initial Setup Steps

### 1. Cloudflare Configuration

#### Create API Token
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use "Custom token" template
4. Configure permissions:
   - Account: `Cloudflare Pages:Edit`
   - Account: `Cloudflare Workers:Edit`
   - Zone Resources: `Include All zones`

#### Get Account ID
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Copy the Account ID from the right sidebar

### 2. GitHub Secrets Configuration

Add these secrets in your GitHub repository:
- `Settings` → `Secrets and variables` → `Actions` → `New repository secret`

Required secrets:
- `CLOUDFLARE_API_TOKEN`: Your API token from step 1
- `CLOUDFLARE_ACCOUNT_ID`: Your account ID from step 1

### 3. Cloudflare Pages Setup

1. Go to [Cloudflare Pages](https://dash.cloudflare.com/pages)
2. Click "Create a project"
3. Connect to GitHub and select `kedster/kedster.github.io`
4. Configure build settings:
   - **Project name**: `kedster-portfolio`
   - **Production branch**: `main`
   - **Build command**: (leave empty)
   - **Build output directory**: `frontend`

### 4. Cloudflare Workers Setup (Optional)

The Workers deployment will be handled automatically via GitHub Actions when you push to the main branch.

## Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Test worker locally (requires authentication)
cd backend && npx wrangler dev

# Preview production build
npm run preview
```

## Deployment Process

### Automatic Deployment (Recommended)
1. Push changes to `main` branch
2. GitHub Actions will automatically:
   - Deploy frontend to Cloudflare Pages
   - Deploy backend worker to Cloudflare Workers
   - Run validation checks

### Manual Deployment
```bash
# Deploy frontend
npm run deploy:pages

# Deploy worker
npm run deploy:worker
```

## Project Structure

```
kedster.github.io/
├── frontend/           # Static files (Cloudflare Pages)
│   ├── index.html      # Main portfolio page
│   ├── Project*.html   # Project showcase pages
│   └── _routes.toml    # Cloudflare Pages config
├── backend/            # API logic (Cloudflare Workers)
│   ├── src/index.js    # Worker entry point
│   └── wrangler.toml   # Worker configuration
├── .github/workflows/  # CI/CD pipeline
│   └── deploy.yml      # Deployment automation
└── package.json        # Dependencies and scripts
```

## Next Steps

1. **Complete Cloudflare Setup**: Follow steps 1-3 above
2. **Test Deployment**: Push changes to main branch
3. **Custom Domain**: Configure custom domain in Cloudflare Pages
4. **Backend Features**: Implement contact form, analytics API
5. **Performance**: Enable Cloudflare optimizations (minification, compression)
6. **Security**: Configure security headers and access policies

## Troubleshooting

### Common Issues

1. **Authentication Error**: Ensure API token has correct permissions
2. **Build Fails**: Check that `frontend` directory contains HTML files
3. **Worker Deploy Fails**: Verify `wrangler.toml` configuration

### Useful Commands

```bash
# Check Wrangler status
npx wrangler whoami

# View Pages deployment logs
npx wrangler pages deployment list

# Tail worker logs
npx wrangler tail kedster-portfolio-worker
```

## Support

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)