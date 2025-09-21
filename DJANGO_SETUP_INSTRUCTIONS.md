# Django Backend Setup Instructions

## ✅ **Backend is Ready!**

Your Django backend has been successfully configured and is ready to use.

## 🚀 **Start the Django Server**

### Option 1: Using Batch File (Recommended)
```bash
cd django_backend
start_server.bat
```

### Option 2: Manual Command
```bash
cd django_backend
python manage.py runserver 0.0.0.0:5003
```

## 🔐 **Admin Panel Access**

Once the server is running:

1. **URL**: http://localhost:5003/admin
2. **Username**: `admin`
3. **Password**: `admin123`

## 📊 **Available Admin Sections**

- **Prayer Requests** - View and manage all prayer submissions
- **Blog Posts** - Manage blog content
- **Volumes** - Manage poetry collections
- **Contact Messages** - View contact form submissions
- **Subscribers** - Manage newsletter subscribers
- **Comments** - Moderate blog comments
- **Site Settings** - Configure site-wide settings

## 🔧 **API Endpoints**

- **Health Check**: http://localhost:5003/api/health/
- **Prayer Requests**: http://localhost:5003/api/prayers/
- **Blog Posts**: http://localhost:5003/api/blog/
- **Volumes**: http://localhost:5003/api/volumes/
- **Contact**: http://localhost:5003/api/contact/
- **Subscribers**: http://localhost:5003/api/subscribers/

## 🐛 **Troubleshooting**

### Prayer Requests Not Saving?
1. Make sure Django server is running on port 5003
2. Check browser console for API errors
3. Verify the frontend is pointing to the correct API URL

### Can't Access Admin Panel?
1. Ensure server is running
2. Use credentials: admin / admin123
3. Clear browser cache if needed

### Database Issues?
```bash
cd django_backend
python manage.py migrate
```

## 📝 **Testing Prayer Requests**

1. Start Django server: `start_server.bat`
2. Go to frontend: http://localhost:3000/prayer-request
3. Submit a test prayer request
4. Check admin panel: http://localhost:5003/admin
5. Look under "Prayer Requests" section

## 🔄 **Frontend Integration**

The React frontend is already configured to work with Django:
- API calls will go to Django backend when server is running
- Falls back to localStorage when backend is offline
- All existing functionality preserved

## ✨ **Next Steps**

1. Start the Django server
2. Test prayer request submission
3. Check admin panel for submissions
4. Customize admin interface as needed

Your website now has a professional Django backend with full admin capabilities!