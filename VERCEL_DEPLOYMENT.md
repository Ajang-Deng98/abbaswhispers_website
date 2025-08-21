# Vercel Full-Stack Deployment Guide

## 🚀 Deploy Complete Website to Vercel

### Prerequisites
- Vercel account (free)
- GitHub repository
- Database service (PlanetScale recommended)

## 📋 Step-by-Step Deployment

### 1. **Setup Database (PlanetScale - Free)**
```bash
1. Go to planetscale.com
2. Sign up with GitHub
3. Create new database: "abba-whispers"
4. Get connection details
5. Import your schema
```

### 2. **Deploy to Vercel**
```bash
1. Go to vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Configure settings (see below)
```

### 3. **Vercel Configuration**
```bash
Framework Preset: Other
Root Directory: ./
Build Command: (leave empty)
Output Directory: (leave empty)
Install Command: npm install
```

### 4. **Environment Variables**
Add these in Vercel dashboard:

```env
# Database
DB_HOST=your-planetscale-host
DB_USER=your-planetscale-user  
DB_PASSWORD=your-planetscale-password
DB_NAME=abba_whispers

# JWT
JWT_SECRET=your-super-secure-jwt-secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# App
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

## 🗄️ Database Setup Options

### Option 1: PlanetScale (Recommended)
```bash
✅ Free MySQL hosting
✅ Automatic scaling
✅ Built-in branching
✅ Easy Vercel integration
```

### Option 2: Supabase
```bash
✅ Free PostgreSQL
✅ Built-in auth
✅ Real-time features
✅ Easy setup
```

### Option 3: Railway
```bash
✅ MySQL/PostgreSQL
✅ Simple deployment
✅ Good free tier
```

## 🔧 Project Structure for Vercel

```
abbaswhispers_website/
├── vercel.json              # Vercel configuration
├── frontend/               # React app
│   ├── package.json
│   └── src/
├── backend/               # API routes
│   ├── server.js
│   └── routes/
└── database/             # Schema files
```

## 🚀 Deployment Process

### Automatic Deployment
1. **Push to GitHub** - Vercel auto-deploys
2. **Build Process** - Vercel builds frontend and backend
3. **API Routes** - Backend becomes serverless functions
4. **Static Files** - Frontend served via CDN

### Manual Deployment
```bash
npm install -g vercel
vercel login
vercel --prod
```

## 🔗 URL Structure After Deployment

```bash
Frontend: https://your-app.vercel.app
API: https://your-app.vercel.app/api/*
Admin: https://your-app.vercel.app/admin
```

## ⚙️ Configuration Files Included

### vercel.json
- Routes frontend and backend
- Configures serverless functions
- Sets up API routing

### Environment Files
- Frontend: Uses /api for backend calls
- Backend: Production database config
- Optimized for Vercel deployment

## 🚨 Important Notes

### Database Connection
- Use connection pooling for serverless
- Set proper timeout values
- Use SSL connections

### File Uploads
- Vercel has 50MB limit per function
- Consider using cloud storage (Cloudinary)
- Temporary files only

### Environment Variables
- Set in Vercel dashboard
- Automatically available to functions
- Secure and encrypted

## 📋 Deployment Checklist

- [ ] Database created and configured
- [ ] Environment variables set in Vercel
- [ ] Repository connected to Vercel
- [ ] Build successful
- [ ] API endpoints working
- [ ] Frontend loading correctly
- [ ] Admin panel accessible
- [ ] Forms submitting properly
- [ ] File uploads working

## 🆘 Troubleshooting

### Build Fails
- Check vercel.json syntax
- Verify package.json scripts
- Check environment variables

### API Not Working
- Verify database connection
- Check environment variables
- Review function logs in Vercel

### Database Connection Issues
- Verify connection string
- Check SSL requirements
- Ensure database is accessible

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [PlanetScale Setup](https://planetscale.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## 🎯 Post-Deployment

### Custom Domain
1. Go to Vercel dashboard
2. Project Settings → Domains
3. Add your custom domain
4. Configure DNS records

### Monitoring
- Check Vercel Analytics
- Monitor function performance
- Set up error tracking

### Scaling
- Vercel auto-scales
- Monitor usage limits
- Upgrade plan if needed