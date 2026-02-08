# 🚀 Deployment Guide

This guide provides step-by-step instructions for deploying the 3D Satellite Visualization application to Vercel.

## Prerequisites

- GitHub/GitLab/Bitbucket account
- Vercel account (free tier works perfectly)
- Your Cryptik API key

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push Code to Git Repository

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: 3D Satellite Visualization"
```

2. Create a new repository on GitHub/GitLab/Bitbucket

3. Push your code:
```bash
git remote add origin <your-repository-url>
git branch -M main
git push -u origin main
```

### Step 2: Import Project to Vercel

1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)

2. Click **"Add New..."** → **"Project"**

3. Import your Git repository:
   - Select your Git provider (GitHub/GitLab/Bitbucket)
   - Authorize Vercel if prompted
   - Select the `satellite-viz` repository

### Step 3: Configure Build Settings

Vercel should auto-detect the settings, but verify:

- **Framework Preset**: `Vite`
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 4: Add Environment Variables

Before deploying, add your API key:

1. In the project configuration screen, scroll to **"Environment Variables"**

2. Add the following:
   - **Name**: `VITE_CRYPTIK_API_KEY`
   - **Value**: `your_actual_api_key_here`
   - **Environments**: Select all (Production, Preview, Development)

3. Click **"Add"**

### Step 5: Deploy

1. Click **"Deploy"**

2. Wait for the build to complete (usually 1-2 minutes)

3. Once deployed, you'll see:
   - ✅ Deployment successful
   - 🔗 Your live URL: `https://your-project-name.vercel.app`

4. Click **"Visit"** to see your live application!

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

### Step 3: Deploy

Navigate to your project directory and run:

```bash
cd satellite-viz
vercel
```

Follow the interactive prompts:
- **Set up and deploy**: `Y`
- **Which scope**: Select your account
- **Link to existing project**: `N`
- **Project name**: `satellite-viz` (or your preferred name)
- **Directory**: `./`
- **Override settings**: `N`

### Step 4: Add Environment Variable

```bash
vercel env add VITE_CRYPTIK_API_KEY
```

When prompted:
- **Value**: Enter your Cryptik API key
- **Environments**: Select all (Production, Preview, Development)

### Step 5: Deploy to Production

```bash
vercel --prod
```

Your application is now live!

## Post-Deployment

### Verify Deployment

1. Visit your deployment URL
2. Check that the globe loads correctly
3. Verify satellite data is being fetched
4. Test satellite selection and info panel
5. Check footer for "Connected" status

### Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Domains**
3. Click **"Add"**
4. Enter your custom domain
5. Follow DNS configuration instructions

### Update Environment Variables

If you need to change your API key:

1. Go to Vercel Dashboard → Your Project
2. Navigate to **Settings** → **Environment Variables**
3. Find `VITE_CRYPTIK_API_KEY`
4. Click **"Edit"** or **"Delete"** and re-add
5. Redeploy:
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment
   - Select **"Redeploy"**

## Continuous Deployment

Once connected to Git, Vercel automatically:
- ✅ Deploys on every push to `main` branch
- ✅ Creates preview deployments for pull requests
- ✅ Provides deployment status in GitHub/GitLab

### Disable Auto-Deploy (if needed)

1. Go to **Settings** → **Git**
2. Toggle **"Production Branch"** settings
3. Configure as needed

## Troubleshooting

### Build Fails

**Error**: `Module not found`
- **Solution**: Ensure all dependencies are in `package.json`
- Run `npm install` locally to verify

**Error**: `Build exceeded maximum duration`
- **Solution**: Check for infinite loops or heavy computations
- Optimize build process

### Environment Variable Not Working

**Symptom**: "API key not configured" error
- **Solution**: 
  1. Verify variable name is exactly `VITE_CRYPTIK_API_KEY`
  2. Ensure it's added to Production environment
  3. Redeploy after adding variables

### Application Loads but No Satellites

**Symptom**: Globe loads but no satellite markers
- **Solution**:
  1. Check browser console for API errors
  2. Verify API key is valid
  3. Check Cryptik API status
  4. Ensure you haven't exceeded rate limits

### 404 on Refresh

**Symptom**: Page works initially but 404 on refresh
- **Solution**: This shouldn't happen with our `vercel.json` config
- Verify `vercel.json` is in the root directory
- Check rewrites configuration

## Performance Optimization

### Enable Analytics

1. Go to **Analytics** tab in Vercel Dashboard
2. Enable Web Analytics
3. Monitor real user metrics

### Speed Insights

1. Enable **Speed Insights** in Vercel Dashboard
2. Monitor Core Web Vitals
3. Optimize based on recommendations

### Caching

Our `vercel.json` already configures optimal caching:
- Static assets: 1 year cache
- HTML: No cache (always fresh)

## Monitoring

### View Logs

1. Go to **Deployments** tab
2. Click on a deployment
3. View **Build Logs** or **Function Logs**

### Error Tracking

Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for usage metrics

## Rollback

If a deployment has issues:

1. Go to **Deployments** tab
2. Find a previous working deployment
3. Click **"..."** → **"Promote to Production"**

## Cost Considerations

**Vercel Free Tier includes:**
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Preview deployments
- ✅ Analytics (basic)

**This application should stay well within free tier limits.**

## Security Best Practices

1. **Never commit `.env` file**
   - Already in `.gitignore`
   - Always use Vercel's environment variables

2. **Use different API keys for environments**
   - Development: Test API key
   - Production: Production API key

3. **Monitor usage**
   - Check Vercel analytics
   - Monitor API rate limits

4. **Keep dependencies updated**
   ```bash
   npm outdated
   npm update
   ```

## Support

If you encounter issues:
1. Check [Vercel Documentation](https://vercel.com/docs)
2. Review build logs in Vercel Dashboard
3. Check browser console for client-side errors
4. Verify API key and Cryptik API status

---

**Your application is now live and accessible worldwide! 🎉**
