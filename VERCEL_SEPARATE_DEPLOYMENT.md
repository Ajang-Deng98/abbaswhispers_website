# Vercel Separate Deployment Guide

## 🚀 Deploy Frontend and Backend as Separate Vercel Projects

### Overview
This guide shows how to deploy your frontend and backend as two separate Vercel projects, giving you better control and easier management.

## 📋 Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository** - Your current repo
3. **Database Service** - PlanetScale (recommended) or Railway

---

## 🗄️ Step 1: Setup Database (PlanetScale)

### 1.1 Create PlanetScale Database
```bash
1. Go to planetscale.com
2. Sign up with GitHub
3. Click "Create database"
4. Name: "abba-whispers"
5. Region: Choose closest to you
6. Click "Create database"
```

### 1.2 Get Connection Details
```bash
1. Go to your database dashboard
2. Click "Connect"
3. Select "Connect with: General"
4. Copy the connection details:
   - Host
   - Username  
   - Password
   - Database name
```

### 1.3 Import Your Schema
```bash
# Option 1: Use PlanetScale CLI
pscale shell abba-whispers main
# Then paste your SQL schema

# Option 2: Use MySQL client
mysql -h [host] -u [username] -p[password] [database] < database/schema.sql
```

---

## 🎨 Step 2: Deploy Frontend Project

### 2.1 Create Frontend Vercel Project
```bash
1. Go to vercel.com/dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Project Name: "abbaswhispers-frontend"
```

### 2.2 Configure Frontend Build Settings
```bash
Framework Preset: Create React App
Root Directory: frontend
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

### 2.3 Frontend Environment Variables
Add these in Vercel dashboard:
```env
REACT_APP_API_URL=https://abbaswhispers-backend.vercel.app/api
GENERATE_SOURCEMAP=false
CI=false
```

### 2.4 Deploy Frontend
```bash
Click "Deploy" - Your frontend will be live at:
https://abbaswhispers-frontend.vercel.app
```

---

## ⚙️ Step 3: Deploy Backend Project

### 3.1 Create Backend Vercel Project
```bash
1. Go to vercel.com/dashboard  
2. Click "New Project"
3. Import the SAME GitHub repository
4. Project Name: "abbaswhispers-backend"
```

### 3.2 Configure Backend Build Settings
```bash
Framework Preset: Other
Root Directory: backend
Build Command: (leave empty)
Output Directory: (leave empty)
Install Command: npm install
```

### 3.3 Backend Environment Variables
Add these in Vercel dashboard:
```env
# Database (Use your PlanetScale details)
DB_HOST=your-planetscale-host
DB_USER=your-planetscale-username
DB_PASSWORD=your-planetscale-password
DB_NAME=abba_whispers

# App Configuration
NODE_ENV=production
FRONTEND_URL=https://abbaswhispers-frontend.vercel.app

# Security
JWT_SECRET=your-generated-jwt-secret

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Other
CONTACT_EMAIL=info@abbaswhispers.com
PRAYER_TEAM_EMAIL=prayer@abbaswhispers.com
```

### 3.4 Deploy Backend
```bash
Click "Deploy" - Your backend will be live at:
https://abbaswhispers-backend.vercel.app
```

---

## 🔧 Step 4: Configuration Files

### 4.1 Frontend vercel.json
Create `frontend/vercel.json`:
```json
{
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### 4.2 Backend vercel.json  
Create `backend/vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

### 4.3 Update Frontend API URL
In `frontend/.env.production`:
```env
REACT_APP_API_URL=https://abbaswhispers-backend.vercel.app
```

---

## 🔗 Step 5: Connect Frontend to Backend

### 5.1 Update Frontend Environment
```bash
1. Go to Frontend Vercel project
2. Settings → Environment Variables
3. Update REACT_APP_API_URL to your backend URL:
   https://abbaswhispers-backend.vercel.app
```

### 5.2 Update Backend CORS
In your backend, ensure CORS allows your frontend:
```javascript
const cors = require('cors');
app.use(cors({
  origin: [
    'https://abbaswhispers-frontend.vercel.app',
    'http://localhost:3000'
  ]
}));
```

### 5.3 Redeploy Both Projects
```bash
1. Push changes to GitHub
2. Both projects will auto-redeploy
3. Test the connection
```

---

## 📋 Step 6: Testing & Verification

### 6.1 Test Frontend
```bash
✅ Visit: https://abbaswhispers-frontend.vercel.app
✅ Check all pages load
✅ Verify navigation works
✅ Test responsive design
```

### 6.2 Test Backend API
```bash
✅ Visit: https://abbaswhispers-backend.vercel.app/api/blog
✅ Should return JSON data
✅ Test other endpoints
✅ Check database connection
```

### 6.3 Test Integration
```bash
✅ Submit contact form
✅ Try prayer request
✅ Test admin login
✅ Verify all functionality
```

---

## 🎯 Step 7: Custom Domains (Optional)

### 7.1 Frontend Domain
```bash
1. Go to Frontend project → Settings → Domains
2. Add: www.abbawhispers.com
3. Configure DNS records as shown
```

### 7.2 Backend Domain  
```bash
1. Go to Backend project → Settings → Domains
2. Add: api.abbawhispers.com
3. Update frontend REACT_APP_API_URL
```

---

## 📊 Project Structure After Deployment

```bash
Frontend Project:
├── URL: https://abbaswhispers-frontend.vercel.app
├── Root: /frontend
├── Serves: React application
└── Connects to: Backend API

Backend Project:  
├── URL: https://abbaswhispers-backend.vercel.app
├── Root: /backend
├── Serves: API endpoints
└── Connects to: PlanetScale database

Database:
├── Service: PlanetScale
├── Type: MySQL
└── Connected to: Backend only
```

---

## 🚨 Important Notes

### Environment Variables
- **Frontend**: Only needs backend API URL
- **Backend**: Needs database credentials and JWT secret
- **Never expose**: Database credentials in frontend

### CORS Configuration
- Backend must allow frontend domain
- Update CORS when changing domains
- Include both production and development URLs

### Database Security
- Use SSL connections
- Rotate passwords regularly
- Monitor access logs

---

## 🆘 Troubleshooting

### Frontend Issues
```bash
Build Fails: Check package.json and dependencies
404 Errors: Verify vercel.json routing
API Calls Fail: Check REACT_APP_API_URL
```

### Backend Issues
```bash
Function Timeout: Optimize database queries
CORS Errors: Update allowed origins
Database Connection: Verify credentials
```

### Database Issues
```bash
Connection Refused: Check PlanetScale status
SSL Errors: Ensure SSL is enabled
Query Errors: Verify schema matches
```

---

## 📋 Deployment Checklist

### Database Setup
- [ ] PlanetScale database created
- [ ] Schema imported successfully
- [ ] Connection details copied
- [ ] SSL enabled

### Frontend Deployment
- [ ] Vercel project created
- [ ] Build settings configured
- [ ] Environment variables set
- [ ] Deployment successful
- [ ] All pages loading

### Backend Deployment  
- [ ] Vercel project created
- [ ] Build settings configured
- [ ] Environment variables set
- [ ] Database connected
- [ ] API endpoints working

### Integration Testing
- [ ] Frontend connects to backend
- [ ] Forms submit successfully
- [ ] Admin panel works
- [ ] Database operations work
- [ ] Email functionality works

---

## 🔗 Useful Commands

### Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
vercel env ls
```

### PlanetScale CLI
```bash
npm install -g @planetscale/cli
pscale auth login
pscale database list
pscale shell [database] [branch]
```

### Testing APIs
```bash
curl https://abbaswhispers-backend.vercel.app/api/blog
curl -X POST https://abbaswhispers-backend.vercel.app/api/contact
```

---

## 🎉 Success!

After following this guide, you'll have:
- ✅ **Frontend**: Deployed on Vercel with custom domain
- ✅ **Backend**: Deployed on Vercel as serverless functions  
- ✅ **Database**: Hosted on PlanetScale with SSL
- ✅ **Integration**: All components working together
- ✅ **Scalability**: Auto-scaling and high performance

Your website will be fully functional with professional hosting! 🚀