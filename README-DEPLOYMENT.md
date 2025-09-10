# Netlify Deployment Guide

## Frontend Deployment on Netlify

### 1. Connect Repository
- Go to [Netlify](https://netlify.com)
- Click "New site from Git"
- Connect your GitHub repository: `Ajang-Deng98/abbaswhispers_website`

### 2. Build Settings
- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `frontend/build`

### 3. Environment Variables
Add these in Netlify dashboard under Site Settings > Environment Variables:
```
REACT_APP_API_URL=https://your-backend-url.herokuapp.com/api
NODE_VERSION=18
NPM_VERSION=9
```

### 4. Domain Configuration
- Custom domain: `abbawhispers.com`
- SSL certificate will be auto-generated

## Backend Deployment (Separate)

### Recommended: Railway/Heroku
1. Deploy Django backend separately
2. Update `REACT_APP_API_URL` with backend URL
3. Configure CORS settings in Django

### Database
- Use PostgreSQL addon on hosting platform
- Update environment variables accordingly

## Files Created for Deployment
- `netlify.toml` - Netlify configuration
- `frontend/public/_redirects` - React Router support
- `frontend/.env.production` - Production environment variables
- Updated `package.json` with Node.js version

## Post-Deployment Steps
1. Update API URL in environment variables
2. Test all functionality
3. Configure custom domain
4. Set up SSL certificate