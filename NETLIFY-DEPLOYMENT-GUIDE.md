# Netlify Deployment Guide for Abbaswhispers Website

## Issues Fixed

### 1. Routing Problems
- ✅ Added proper `_redirects` file for SPA routing
- ✅ Updated `netlify.toml` with correct redirect rules
- ✅ Added catch-all route in React Router
- ✅ Created 404.html fallback

### 2. Image Loading Issues
- ✅ Fixed image paths to use environment variables
- ✅ Added proper error handling for missing images
- ✅ Created fallback system for broken images
- ✅ Updated API URL configuration

### 3. Build Configuration
- ✅ Updated build settings in netlify.toml
- ✅ Fixed environment variables
- ✅ Added proper caching headers
- ✅ Disabled source maps for production

## Deployment Steps

### Option 1: Automatic Deployment (Recommended)

1. **Connect to Git Repository**
   - Go to Netlify dashboard
   - Click "New site from Git"
   - Connect your GitHub/GitLab repository
   - Select the Abbaswhispers_website repository

2. **Configure Build Settings**
   - Base directory: `frontend`
   - Build command: `CI=false npm run build`
   - Publish directory: `frontend/build`

3. **Set Environment Variables**
   - Go to Site settings > Environment variables
   - Add: `REACT_APP_API_URL` = `https://your-backend-url.herokuapp.com/api`
   - Add: `GENERATE_SOURCEMAP` = `false`

### Option 2: Manual Deployment

1. **Build Locally**
   ```bash
   cd frontend
   npm install
   npm run build:netlify
   ```

2. **Deploy to Netlify**
   - Drag and drop the `frontend/build` folder to Netlify
   - Or use Netlify CLI: `netlify deploy --prod --dir=frontend/build`

## Backend Configuration

Make sure your Django backend is properly configured:

1. **Update CORS Settings**
   ```python
   CORS_ALLOWED_ORIGINS = [
       "https://your-netlify-site.netlify.app",
       "https://abbaswhispers.com",  # Your custom domain
   ]
   ```

2. **Update ALLOWED_HOSTS**
   ```python
   ALLOWED_HOSTS = [
       'your-backend-url.herokuapp.com',
       'localhost',
       '127.0.0.1',
   ]
   ```

3. **Static Files Configuration**
   ```python
   STATIC_URL = '/static/'
   STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
   MEDIA_URL = '/media/'
   MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
   ```

## Custom Domain Setup

1. **Add Custom Domain**
   - Go to Site settings > Domain management
   - Add your custom domain (e.g., abbaswhispers.com)
   - Update DNS records as instructed

2. **SSL Certificate**
   - Netlify automatically provides SSL certificates
   - Ensure "Force HTTPS" is enabled

## Troubleshooting

### Pages Not Loading
- Check that `_redirects` file is in the `public` folder
- Verify netlify.toml configuration
- Ensure React Router has catch-all route

### Images Not Showing
- Check API URL in environment variables
- Verify backend CORS settings
- Ensure media files are properly served by Django

### Build Failures
- Check Node.js version (should be 18.x)
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

## Performance Optimization

1. **Caching Headers** (Already configured in netlify.toml)
   - Static assets cached for 1 year
   - HTML files not cached

2. **Image Optimization**
   - Consider using Netlify Image CDN
   - Implement lazy loading for images

3. **Bundle Optimization**
   - Source maps disabled in production
   - Code splitting enabled by default

## Monitoring

1. **Analytics**
   - Enable Netlify Analytics in site settings
   - Add Google Analytics if needed

2. **Error Tracking**
   - Monitor Netlify function logs
   - Set up error boundaries in React

## Support

If you encounter issues:
1. Check Netlify deploy logs
2. Verify environment variables
3. Test locally with production build
4. Check browser console for errors

---

**Note**: Replace `your-backend-url.herokuapp.com` with your actual backend URL and `your-netlify-site.netlify.app` with your actual Netlify site URL.