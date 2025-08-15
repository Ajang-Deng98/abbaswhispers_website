# 🚀 Pre-Deployment Security & Configuration Checklist

## ⚠️ CRITICAL SECURITY FIXES REQUIRED

### 1. Environment Variables
- [ ] Update `.env` with production values from `.env.production` template
- [ ] Generate strong JWT secret (32+ characters)
- [ ] Set up Gmail App Password for SMTP
- [ ] Remove hardcoded database password

### 2. Security Vulnerabilities
- [ ] Update `nth-check` package: `npm audit fix`
- [ ] Implement CSRF protection in API routes
- [ ] Fix path traversal in upload middleware
- [ ] Sanitize log inputs to prevent log injection

### 3. Database Security
- [ ] Change default admin password from `password123`
- [ ] Create production database user with limited privileges
- [ ] Enable SSL for database connections

### 4. API Configuration
- [ ] Update `netlify.toml` with actual backend URL
- [ ] Set `REACT_APP_API_URL` in Netlify environment
- [ ] Configure CORS for production domains only

## 🔧 Configuration Updates Needed

### Backend (.env)
```bash
# Update these values:
DB_HOST=your-actual-mysql-host
DB_USER=your-db-user
DB_PASSWORD=your-secure-password
JWT_SECRET=generate-32-char-secret
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FRONTEND_URL=https://your-domain.netlify.app
```

### Frontend (Netlify)
```bash
# Environment variable:
REACT_APP_API_URL=https://your-backend-domain.com/api
```

### Netlify.toml
```toml
[build.environment]
  REACT_APP_API_URL = "https://your-actual-backend-domain.com/api"
```

## 🛡️ Security Improvements

### 1. Fix Upload Security
```javascript
// In backend/middleware/upload.js
const path = require('path');
const sanitize = require('sanitize-filename');

// Sanitize filename
filename: (req, file, cb) => {
  const sanitized = sanitize(file.originalname);
  const safeName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(sanitized);
  cb(null, safeName);
}
```

### 2. Add CSRF Protection
```javascript
// Install: npm install csurf
const csrf = require('csurf');
app.use(csrf({ cookie: true }));
```

### 3. Sanitize Logs
```javascript
// Replace console.log(error) with:
console.log('Error:', encodeURIComponent(error.message));
```

## 📋 Deployment Steps

### 1. Backend (Hostinger)
1. Update `.env` with production values
2. Run security fixes: `npm audit fix`
3. Upload to Hostinger
4. Configure Node.js app
5. Test API endpoints

### 2. Frontend (Netlify)
1. Update `netlify.toml` with backend URL
2. Set environment variables in Netlify
3. Deploy from Git or manual upload
4. Test all functionality

### 3. Database
1. Import `schema.sql` to production database
2. Change admin password immediately
3. Test database connections

## ✅ Post-Deployment Verification

### Security Tests
- [ ] Admin login works with new password
- [ ] HTTPS is enabled on both frontend and backend
- [ ] API endpoints require proper authentication
- [ ] File uploads are secure and validated
- [ ] Email notifications work correctly

### Functionality Tests
- [ ] All pages load correctly
- [ ] Contact form submissions work
- [ ] Prayer requests are saved
- [ ] Newsletter subscription works
- [ ] Admin panel functions properly
- [ ] Blog posts and volumes display correctly

### Performance Tests
- [ ] Site loads in under 3 seconds
- [ ] Images are optimized
- [ ] Mobile responsiveness works
- [ ] SEO meta tags are present

## 🚨 IMMEDIATE ACTIONS REQUIRED

1. **Change Admin Password**: Login and change from `password123`
2. **Update Dependencies**: Run `npm audit fix` in both frontend and backend
3. **Secure Environment Variables**: Never commit `.env` files to version control
4. **Test Email**: Verify contact forms and prayer requests send emails
5. **SSL Certificates**: Ensure HTTPS is working on both domains

## 📞 Support Contacts

- **Technical Issues**: Check error logs in Netlify and Hostinger
- **Database Issues**: Use phpMyAdmin or MySQL command line
- **Email Issues**: Verify Gmail App Password and SMTP settings

---

**⚠️ DO NOT DEPLOY WITHOUT COMPLETING THIS CHECKLIST**