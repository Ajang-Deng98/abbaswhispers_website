# Abba Whispers Website

A complete, responsive, SEO-optimized website for Abba Whispers, a Christian faith-based company dedicated to healing and empowering people through writings inspired by the Book of Psalms.

## 🌟 Tech Stack

- **Frontend**: React 18 with modern hooks and components
- **Backend**: Django 4.2 with Django REST Framework
- **Database**: PostgreSQL
- **Authentication**: JWT with Django Simple JWT
- **Styling**: Custom CSS with responsive design

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL

### 1. Setup PostgreSQL
```sql
-- In PG Admin or psql
ALTER USER postgres PASSWORD 'Ajangdatabase';
CREATE DATABASE abba_whispers;
GRANT ALL PRIVILEGES ON DATABASE abba_whispers TO postgres;
```

### 2. Setup Django Backend
```bash
cd django_backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### 3. Setup React Frontend
```bash
cd frontend
npm install
npm start
```

### 4. Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Django Admin**: http://localhost:8000/admin

## 📁 Project Structure

```
Abbaswhispers_website/
├── django_backend/          # Django REST API
│   ├── abba_whispers/      # Django project settings
│   ├── api/                # API app with models/views
│   ├── media/              # Uploaded files
│   └── requirements.txt    # Python dependencies
├── frontend/              # React frontend
│   ├── src/               # React source code
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS files
│   │   └── utils/         # API utilities
│   ├── public/            # Static files
│   └── package.json       # React dependencies
└── package.json           # Node.js dependencies
```

## 🔧 API Endpoints

### Public Endpoints
- `GET /api/blog/` - Get all published blog posts
- `GET /api/volumes/` - Get all published volumes
- `POST /api/prayers/` - Submit prayer request
- `POST /api/contact/` - Submit contact form
- `POST /api/subscribers/subscribe/` - Newsletter subscription

### Admin Endpoints (Requires Authentication)
- `POST /api/auth/login/` - Admin login
- `GET /api/prayers/` - Get prayer requests
- `PATCH /api/prayers/{id}/` - Update prayer status

## 🎨 Features

### Frontend (React)
- Responsive design with mobile-first approach
- Modern UI with smooth animations
- SEO optimized with React Helmet
- Lazy loading and performance optimization

### Backend (Django)
- RESTful API with Django REST Framework
- JWT authentication
- PostgreSQL database with optimized queries
- Built-in admin panel
- Email integration for notifications

### Content Management
- **Blog Posts**: Create, edit, and publish articles
- **Volumes**: Manage poetry collections with audio
- **Prayer Requests**: Handle and track prayer submissions
- **Subscribers**: Newsletter management
- **Contact Forms**: Message handling

## 🛡️ Security Features

- JWT token authentication
- CORS configuration
- Input validation and sanitization
- Rate limiting
- SQL injection protection
- XSS prevention

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
npm run build
# Deploy build/ folder
```

### Backend (Heroku/DigitalOcean)
```bash
# Install gunicorn
pip install gunicorn

# Run production server
gunicorn abba_whispers.wsgi:application
```

### Database (PostgreSQL)
- Use managed PostgreSQL service
- Update DATABASE_URL in production

## 📊 Environment Variables

### Django (.env)
```env
SECRET_KEY=your_secret_key
DEBUG=False
DB_NAME=abba_whispers
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

### React (.env)
```env
REACT_APP_API_URL=http://localhost:8000/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ for the Abba Whispers ministry