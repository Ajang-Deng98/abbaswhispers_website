# Abba Whispers Website Deployment Guide

## Prerequisites

- Node.js (v16 or higher)
- MySQL database
- Netlify account (for frontend)
- Hostinger account (for backend and database)
- Email service (Gmail with App Password recommended)

## Database Setup (Hostinger MySQL)

1. **Create MySQL Database on Hostinger:**
   - Log into your Hostinger control panel
   - Go to "Databases" → "MySQL Databases"
   - Create a new database named `abba_whispers`
   - Create a database user and assign it to the database
   - Note down the database credentials

2. **Import Database Schema:**
   - Use phpMyAdmin or MySQL command line
   - Import the `database/schema.sql` file
   - This will create all necessary tables and sample data

## Backend Deployment (Hostinger)

1. **Prepare Backend Files:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables:**
   - Copy `.env.example` to `.env`
   - Update the following variables:
   ```
   DB_HOST=your_hostinger_mysql_host
   DB_USER=your_database_username
   DB_PASSWORD=your_database_password
   DB_NAME=abba_whispers
   JWT_SECRET=your_secure_jwt_secret
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_gmail_app_password
   FRONTEND_URL=https://your-netlify-domain.netlify.app
   ```

3. **Upload to Hostinger:**
   - Compress the entire `backend` folder
   - Upload via File Manager or FTP
   - Extract in your domain's public_html folder
   - Install dependencies: `npm install`
   - Start the application: `npm start`

4. **Configure Node.js on Hostinger:**
   - In control panel, go to "Advanced" → "Node.js"
   - Set Node.js version to 16 or higher
   - Set startup file to `server.js`
   - Add environment variables from your `.env` file

## Frontend Deployment (Netlify)

1. **Prepare Frontend:**
   ```bash
   npm install
   ```

2. **Update API Configuration:**
   - In `src/utils/api.js`, update `API_BASE_URL` to your Hostinger backend URL
   - Or set `REACT_APP_API_URL` environment variable in Netlify

3. **Deploy to Netlify:**
   
   **Option A: Git Integration (Recommended)**
   - Push your code to GitHub/GitLab
   - Connect your repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Add environment variable: `REACT_APP_API_URL=https://your-backend-domain.com/api`

   **Option B: Manual Deploy**
   ```bash
   npm run build
   ```
   - Drag and drop the `build` folder to Netlify

4. **Configure Netlify Settings:**
   - The `netlify.toml` file will handle redirects and headers
   - Ensure custom domain is configured if needed

## Email Configuration

1. **Gmail Setup:**
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password for the application
   - Use this App Password in your `SMTP_PASS` environment variable

2. **Alternative Email Services:**
   - You can use any SMTP service (SendGrid, Mailgun, etc.)
   - Update the SMTP configuration in your `.env` file accordingly

## SSL Certificate

1. **Hostinger:**
   - Enable SSL certificate in your Hostinger control panel
   - This is usually free with Let's Encrypt

2. **Netlify:**
   - SSL is automatically provided by Netlify
   - Custom domains get SSL certificates automatically

## Testing the Deployment

1. **Frontend Tests:**
   - Visit your Netlify URL
   - Test all pages and navigation
   - Verify responsive design on mobile devices

2. **Backend Tests:**
   - Test API endpoints: `https://your-backend-domain.com/api/health`
   - Test contact form submission
   - Test prayer request submission
   - Test newsletter subscription

3. **Database Tests:**
   - Verify admin login works (username: admin, password: password123)
   - Test creating blog posts and volumes
   - Check prayer requests are being stored

## Post-Deployment Configuration

1. **Admin Access:**
   - Change the default admin password immediately
   - Access admin panel at: `https://your-domain.com/admin`

2. **Content Setup:**
   - Add your actual content, images, and volumes
   - Configure site settings
   - Test all functionality

3. **SEO Setup:**
   - Submit sitemap to Google Search Console
   - Set up Google Analytics
   - Verify meta tags and social media previews

## Monitoring and Maintenance

1. **Regular Backups:**
   - Set up automated database backups
   - Keep backups of uploaded files

2. **Updates:**
   - Regularly update dependencies
   - Monitor for security updates

3. **Performance:**
   - Monitor site speed and performance
   - Optimize images and content as needed

## Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Ensure `FRONTEND_URL` is correctly set in backend `.env`
   - Check CORS configuration in `server.js`

2. **Database Connection Issues:**
   - Verify database credentials
   - Check if database server is accessible
   - Ensure database exists and tables are created

3. **Email Not Sending:**
   - Verify SMTP credentials
   - Check if Gmail App Password is correct
   - Test with a simple email service first

4. **Build Failures:**
   - Check Node.js version compatibility
   - Ensure all dependencies are installed
   - Review build logs for specific errors

## Support

For technical support or questions about deployment:
- Check the documentation in each component file
- Review error logs in both Netlify and Hostinger
- Test API endpoints individually to isolate issues

## Security Checklist

- [ ] Changed default admin password
- [ ] Environment variables are secure and not exposed
- [ ] SSL certificates are active
- [ ] Database access is restricted
- [ ] Rate limiting is configured
- [ ] Input validation is working
- [ ] CORS is properly configured
- [ ] Security headers are set

## Performance Optimization

- [ ] Images are optimized and compressed
- [ ] Lazy loading is implemented
- [ ] Caching headers are configured
- [ ] Database queries are optimized
- [ ] CDN is configured (optional)
- [ ] Gzip compression is enabled