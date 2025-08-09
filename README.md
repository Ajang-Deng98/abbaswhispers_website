# Abba Whispers Website

A complete, responsive, SEO-optimized website for Abba Whispers, a Christian faith-based company dedicated to healing and empowering people through writings inspired by the Book of Psalms.

## 🌟 Features

### Frontend (React)
- **Responsive Design**: Mobile-first approach with elegant design
- **Modern UI**: Warm color palette (cream, gold, olive) with smooth animations
- **SEO Optimized**: Meta tags, structured data, and search-friendly URLs
- **Performance**: Lazy loading, optimized images, and fast loading times
- **Accessibility**: WCAG compliant with proper semantic HTML

### Pages Included
- **Home**: Hero section, featured volumes, latest blog posts
- **About**: Mission, story, values, and team information
- **Volumes**: Inspirational writings with category filtering
- **Blog**: Posts with search, categories, and pagination
- **Contact**: Contact form with FAQ section
- **Prayer Request**: Secure prayer submission form
- **Admin Dashboard**: Content management system

### Backend (Node.js + Express)
- **RESTful API**: Complete API for all frontend functionality
- **Authentication**: JWT-based admin authentication
- **Database**: MySQL with optimized schema
- **Email Integration**: Automated notifications and confirmations
- **Security**: Rate limiting, input validation, CORS protection
- **File Upload**: Support for images and documents

### Database (MySQL)
- **Optimized Schema**: Efficient table structure with proper indexing
- **Data Integrity**: Foreign keys and constraints
- **Sample Data**: Pre-populated with example content
- **Backup Ready**: Easy backup and restore procedures

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MySQL database
- Email service (Gmail recommended)

### Local Development

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd Abbaswhispers_website
   npm install
   cd backend && npm install
   ```

2. **Database Setup**
   ```bash
   # Import the database schema
   mysql -u root -p < database/schema.sql
   ```

3. **Environment Configuration**
   ```bash
   # Backend
   cd backend
   cp .env.example .env
   # Edit .env with your database and email credentials
   
   # Frontend
   cd ..
   # Create .env.local if needed for API URL
   ```

4. **Start Development Servers**
   ```bash
   # Backend (Terminal 1)
   cd backend
   npm run dev
   
   # Frontend (Terminal 2)
   npm start
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Admin Panel: http://localhost:3000/admin (admin/password123)

## 📁 Project Structure

```
Abbaswhispers_website/
├── public/                 # Static files
├── src/                   # React source code
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── styles/           # CSS files
│   └── utils/            # Utility functions
├── backend/              # Node.js backend
│   ├── config/          # Database configuration
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── server.js        # Main server file
├── database/            # Database schema
└── DEPLOYMENT.md        # Deployment instructions
```

## 🎨 Design System

### Color Palette
- **Primary Gold**: #D4AF37
- **Cream**: #F5F5DC
- **Light Olive**: #9CAF88
- **Deep Blue**: #2C3E50
- **Soft White**: #FEFEFE

### Typography
- **Headings**: Playfair Display (serif)
- **Body Text**: Inter (sans-serif)
- **Responsive**: Scales appropriately on all devices

### Components
- **Cards**: Elevated design with subtle shadows
- **Buttons**: Smooth hover transitions
- **Forms**: Clean, accessible input fields
- **Navigation**: Sticky header with smooth scrolling

## 🔧 API Endpoints

### Public Endpoints
- `GET /api/blog` - Get all published blog posts
- `GET /api/blog/:id` - Get single blog post
- `GET /api/volumes` - Get all published volumes
- `POST /api/prayers` - Submit prayer request
- `POST /api/contact` - Submit contact form
- `POST /api/subscribers/subscribe` - Newsletter subscription

### Admin Endpoints (Requires Authentication)
- `POST /api/auth/login` - Admin login
- `POST /api/blog` - Create blog post
- `PUT /api/blog/:id` - Update blog post
- `DELETE /api/blog/:id` - Delete blog post
- `GET /api/prayers` - Get prayer requests
- `PUT /api/prayers/:id/status` - Update prayer status

## 🛡️ Security Features

- **Input Validation**: All forms validated on both client and server
- **SQL Injection Protection**: Parameterized queries
- **XSS Prevention**: Content sanitization
- **CORS Configuration**: Proper cross-origin settings
- **Rate Limiting**: API request throttling
- **JWT Authentication**: Secure admin access
- **HTTPS Ready**: SSL certificate support

## 📱 Mobile Optimization

- **Responsive Grid**: CSS Grid and Flexbox
- **Touch-Friendly**: Proper button sizes and spacing
- **Fast Loading**: Optimized images and lazy loading
- **PWA Ready**: Manifest file for app-like experience
- **Offline Support**: Service worker ready

## 🔍 SEO Features

- **Meta Tags**: Dynamic meta descriptions and titles
- **Open Graph**: Social media sharing optimization
- **Structured Data**: Schema.org markup
- **Sitemap**: XML sitemap generation
- **Robots.txt**: Search engine crawling instructions
- **Clean URLs**: SEO-friendly URL structure

## 📊 Analytics Ready

- **Google Analytics**: Easy integration
- **Performance Monitoring**: Core Web Vitals tracking
- **User Behavior**: Event tracking setup
- **Conversion Tracking**: Goal and funnel setup

## 🚀 Deployment

The website is designed for easy deployment:

- **Frontend**: Netlify (recommended) or Vercel
- **Backend**: Hostinger, DigitalOcean, or AWS
- **Database**: MySQL on Hostinger or cloud providers
- **CDN**: Cloudflare integration ready

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Support

For support or questions:
- Email: info@abbawhispers.com
- Documentation: Check component files for detailed comments
- Issues: Use the GitHub issues tracker

## 🎯 Future Enhancements

- [ ] Multi-language support
- [ ] Advanced search functionality
- [ ] User accounts and profiles
- [ ] E-commerce integration
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Social media integration
- [ ] Podcast integration
- [ ] Event management system
- [ ] Donation system

---

Built with ❤️ for the Abba Whispers ministry