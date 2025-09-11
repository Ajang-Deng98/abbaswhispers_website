# Backend Deployment Guide

## Issues Fixed ✅

### 1. Database & Sample Data
- ✅ Created sample blog posts, volumes, and testimonials
- ✅ Added management command to populate data automatically
- ✅ Fixed database configuration for production
- ✅ Added PostgreSQL and production database support

### 2. CORS & API Access
- ✅ Improved CORS configuration
- ✅ Added proper headers for frontend access
- ✅ Fixed API endpoints and permissions

### 3. Production Ready
- ✅ Added Heroku/Railway deployment files
- ✅ Updated requirements.txt with all dependencies
- ✅ Added production settings and security

## Quick Deploy Options

### Option 1: Heroku (Recommended)

1. **Create Heroku App**
   ```bash
   heroku create abbawhispers-backend
   ```

2. **Add PostgreSQL**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set DEBUG=False
   heroku config:set SECRET_KEY=your-secret-key
   heroku config:set CORS_ALLOWED_ORIGINS=https://your-netlify-site.netlify.app
   ```

4. **Deploy**
   ```bash
   git subtree push --prefix=django_backend heroku main
   ```

### Option 2: Railway

1. **Connect Repository**
   - Go to Railway.app
   - Connect GitHub repository
   - Select `django_backend` folder

2. **Environment Variables**
   ```
   DEBUG=False
   SECRET_KEY=your-secret-key
   CORS_ALLOWED_ORIGINS=https://your-netlify-site.netlify.app
   ```

3. **Deploy automatically on push**

### Option 3: Render

1. **Create Web Service**
   - Connect GitHub repository
   - Root directory: `django_backend`
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn abba_whispers.wsgi:application`

## Sample Data Created

### Blog Posts (3)
- "Finding Peace in the Psalms"
- "Gratitude in Every Season" 
- "Strength for the Journey"

### Volumes (3)
- "SELAH - Volume 1: Thanksgiving"
- "SELAH - Volume 2: Wonder"
- "SELAH - Volume 3: Faith"

### Testimonials (3)
- Sarah M. - Mother testimonial
- David K. - Pastor testimonial
- Maria L. - Counselor testimonial

## API Endpoints Working

- `GET /api/health/` - Health check
- `GET /api/blog/` - Blog posts
- `GET /api/volumes/` - Poetry volumes
- `GET /api/testimonials/` - Testimonials
- `POST /api/contact/` - Contact form
- `POST /api/prayers/` - Prayer requests

## Frontend Integration

Update your Netlify environment variables:
```
REACT_APP_API_URL=https://your-backend-app.herokuapp.com/api
```

## Testing Locally

1. **Start Backend**
   ```bash
   cd django_backend
   python manage.py runserver
   ```

2. **Test API**
   ```bash
   python test_api.py
   ```

3. **Start Frontend**
   ```bash
   cd frontend
   npm start
   ```

## Database Admin

- **Username**: admin
- **Password**: admin123
- **URL**: https://your-backend-url.herokuapp.com/admin

## Next Steps

1. Deploy backend to Heroku/Railway/Render
2. Update frontend API URL in Netlify
3. Test all pages work with real data
4. Set up custom domain (optional)

---

**Your backend is now ready for production deployment!** 🚀