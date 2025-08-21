# Netlify Deployment Guide

## 🚀 Deploy Frontend to Netlify

### Method 1: GitHub Integration (Recommended)

1. **Login to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login with GitHub account

2. **Connect Repository**
   - Click "New site from Git"
   - Choose "GitHub"
   - Select your `abbaswhispers_website` repository

3. **Configure Build Settings**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
   - **Node version**: `18`

4. **Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add: `REACT_APP_API_URL` = `https://your-backend-domain.com`
   - Add: `GENERATE_SOURCEMAP` = `false`

5. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy

### Method 2: Manual Upload

1. **Build Locally**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Upload to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `frontend/build` folder
   - Or use Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=frontend/build
   ```

### Method 3: Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login and Initialize**
   ```bash
   netlify login
   netlify init
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

## ⚙️ Configuration Files

### netlify.toml
- Already configured in root directory
- Sets build settings and redirects
- Handles SPA routing

### Environment Variables
- `REACT_APP_API_URL`: Your backend API URL
- `GENERATE_SOURCEMAP`: Set to false for production

## 🔧 Post-Deployment Setup

1. **Custom Domain** (Optional)
   - Go to Site Settings → Domain Management
   - Add your custom domain
   - Configure DNS records

2. **HTTPS**
   - Automatically enabled by Netlify
   - Force HTTPS in Site Settings

3. **Forms** (If using Netlify Forms)
   - Add `netlify` attribute to forms
   - Configure form notifications

## 🚨 Important Notes

- **API URL**: Update `REACT_APP_API_URL` to your deployed backend
- **CORS**: Ensure backend allows your Netlify domain
- **Build Time**: First build may take 2-3 minutes
- **Auto Deploy**: Pushes to main branch trigger auto-deployment

## 📋 Checklist

- [ ] Repository connected to Netlify
- [ ] Build settings configured
- [ ] Environment variables set
- [ ] Backend API URL updated
- [ ] CORS configured on backend
- [ ] Custom domain configured (optional)
- [ ] HTTPS enabled
- [ ] Test all functionality

## 🔗 Useful Links

- [Netlify Documentation](https://docs.netlify.com/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
- [Custom Domain Setup](https://docs.netlify.com/domains-https/custom-domains/)

## 🆘 Troubleshooting

### Build Fails
- Check Node.js version (use 18)
- Verify package.json in frontend directory
- Check build logs for specific errors

### 404 Errors
- Ensure `_redirects` file exists in public folder
- Check netlify.toml redirect configuration

### API Calls Fail
- Verify REACT_APP_API_URL is correct
- Check CORS settings on backend
- Ensure backend is deployed and accessible

### Environment Variables Not Working
- Prefix with `REACT_APP_`
- Restart build after adding variables
- Check spelling and case sensitivity