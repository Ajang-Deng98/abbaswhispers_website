# Deployment Guide for Abba's Whispers

## Pre-Deployment Checklist ✅

### Frontend (React)
- ✅ All components working without errors
- ✅ Environment variables configured
- ✅ SEO meta tags implemented
- ✅ Images optimized and properly referenced
- ✅ Build process tested locally

### Backend (Django)
- ✅ Database models and migrations ready
- ✅ API endpoints tested
- ✅ Environment variables configured
- ✅ Static files configuration
- ✅ CORS settings configured

### SEO & Performance
- ✅ Sitemap.xml created
- ✅ Robots.txt configured
- ✅ Meta tags optimized
- ✅ Image alt texts added
- ✅ Mobile responsive design

## Deployment Options

### Option 1: Netlify (Frontend) + Railway (Backend)

#### Frontend Deployment (Netlify)
1. Connect GitHub repository to Netlify
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Environment variables:
   - `REACT_APP_API_URL`: Your backend URL
   - `REACT_APP_SITE_URL`: https://abbawhispers.com

#### Backend Deployment (Railway)
1. Connect GitHub repository to Railway
2. Environment variables from `.env.production`
3. Database: PostgreSQL addon
4. Domain: Custom domain setup

### Option 2: Vercel (Frontend) + Heroku (Backend)

#### Frontend Deployment (Vercel)
1. Import project from GitHub
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

#### Backend Deployment (Heroku)
1. Create Heroku app
2. Add PostgreSQL addon
3. Configure environment variables
4. Deploy from GitHub

### Option 3: Full Stack on Railway
1. Deploy both frontend and backend on Railway
2. Use Railway's static site hosting for frontend
3. PostgreSQL database included

## Environment Variables Needed

### Frontend (.env.production)
```
REACT_APP_API_URL=https://your-backend-url.com/api
REACT_APP_SITE_URL=https://abbawhispers.com
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
```

### Backend (.env.production)
```
SECRET_KEY=your-production-secret-key
DEBUG=False
ALLOWED_HOSTS=your-domain.com
DB_NAME=abba_whispers_prod
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_HOST=your-db-host
DB_PORT=5432
CORS_ALLOWED_ORIGINS=https://abbawhispers.com
```

## Post-Deployment Steps

1. **Test all functionality**
   - Homepage loading
   - Navigation working
   - Forms submitting
   - API connections

2. **SEO Setup**
   - Submit sitemap to Google Search Console
   - Verify domain ownership
   - Set up Google Analytics

3. **Performance Monitoring**
   - Check Core Web Vitals
   - Test mobile responsiveness
   - Verify loading speeds

4. **Security**
   - SSL certificate active
   - HTTPS redirects working
   - Environment variables secure

## Domain Setup

1. **Purchase domain**: abbawhispers.com
2. **DNS Configuration**:
   - A record: Point to hosting provider IP
   - CNAME: www -> abbawhispers.com
3. **SSL Certificate**: Enable HTTPS
4. **Email Setup**: Configure MX records for contact emails

## Monitoring & Maintenance

- **Google Analytics**: Track visitor behavior
- **Search Console**: Monitor SEO performance
- **Uptime monitoring**: Ensure site availability
- **Regular backups**: Database and media files
- **Security updates**: Keep dependencies updated

## Troubleshooting

### Common Issues:
1. **CORS errors**: Check CORS_ALLOWED_ORIGINS
2. **API not connecting**: Verify REACT_APP_API_URL
3. **Images not loading**: Check static file configuration
4. **Database connection**: Verify database credentials

### Support Contacts:
- Technical issues: Check deployment platform docs
- Domain issues: Contact domain registrar
- Email issues: Check email provider settings