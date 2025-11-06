#!/bin/bash

# Hostinger VPS Deployment Script for Abba's Whispers
# Run this script on your VPS after connecting via SSH

echo "🚀 Starting Abba's Whispers deployment on Hostinger VPS..."

# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y python3 python3-pip python3-venv nginx postgresql postgresql-contrib nodejs npm git curl

# Install PM2 for process management
sudo npm install -g pm2

# Create application directory
sudo mkdir -p /var/www/abbaswhispers
sudo chown $USER:$USER /var/www/abbaswhispers
cd /var/www/abbaswhispers

# Clone repository
git clone https://github.com/Ajang-Deng98/abbaswhispers_website.git .

# Setup Python virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
cd django_backend
pip install -r requirements.txt
pip install gunicorn

# Setup PostgreSQL database
sudo -u postgres psql << EOF
CREATE DATABASE abba_whispers;
CREATE USER abba_user WITH PASSWORD 'secure_password_123';
GRANT ALL PRIVILEGES ON DATABASE abba_whispers TO abba_user;
ALTER USER abba_user CREATEDB;
\q
EOF

# Create production environment file
cat > .env << EOF
SECRET_KEY=your_secret_key_here_change_this_in_production
DEBUG=False
ALLOWED_HOSTS=abbaswhispers.com,www.abbaswhispers.com,46.202.141.138
DB_NAME=abba_whispers
DB_USER=abba_user
DB_PASSWORD=secure_password_123
DB_HOST=localhost
DB_PORT=5432
CORS_ALLOWED_ORIGINS=https://abbaswhispers.com,https://www.abbaswhispers.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
CONTACT_EMAIL=info@abbawhispers.com
PRAYER_TEAM_EMAIL=prayer@abbawhispers.com
EOF

# Run Django migrations
python manage.py migrate
python manage.py collectstatic --noinput

# Create superuser (you'll need to do this manually)
echo "📝 Remember to create superuser: python manage.py createsuperuser"

# Build frontend
cd ../frontend
npm install
npm run build

# Create Gunicorn service file
sudo tee /etc/systemd/system/abbaswhispers.service > /dev/null << EOF
[Unit]
Description=Abba's Whispers Django App
After=network.target

[Service]
User=$USER
Group=www-data
WorkingDirectory=/var/www/abbaswhispers/django_backend
Environment="PATH=/var/www/abbaswhispers/venv/bin"
ExecStart=/var/www/abbaswhispers/venv/bin/gunicorn --workers 3 --bind unix:/var/www/abbaswhispers/abbaswhispers.sock abba_whispers.wsgi:application
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Create Nginx configuration
sudo tee /etc/nginx/sites-available/abbaswhispers << EOF
server {
    listen 80;
    server_name abbaswhispers.com www.abbaswhispers.com 46.202.141.138;

    location = /favicon.ico { access_log off; log_not_found off; }
    
    location /static/ {
        root /var/www/abbaswhispers/django_backend;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    location /media/ {
        root /var/www/abbaswhispers/django_backend;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /api/ {
        include proxy_params;
        proxy_pass http://unix:/var/www/abbaswhispers/abbaswhispers.sock;
    }

    location /admin/ {
        include proxy_params;
        proxy_pass http://unix:/var/www/abbaswhispers/abbaswhispers.sock;
    }

    location / {
        root /var/www/abbaswhispers/frontend/dist;
        try_files \$uri \$uri/ /index.html;
        expires 1h;
        add_header Cache-Control "public";
    }
}
EOF

# Enable Nginx site
sudo ln -sf /etc/nginx/sites-available/abbaswhispers /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Start and enable services
sudo systemctl daemon-reload
sudo systemctl start abbaswhispers
sudo systemctl enable abbaswhispers
sudo systemctl restart nginx
sudo systemctl enable nginx

# Setup SSL with Let's Encrypt (optional)
sudo apt install -y certbot python3-certbot-nginx

echo "✅ Deployment complete!"
echo "🔧 Next steps:"
echo "1. Update .env file with your actual secret key and email credentials"
echo "2. Create superuser: cd /var/www/abbaswhispers/django_backend && source ../venv/bin/activate && python manage.py createsuperuser"
echo "3. Setup SSL: sudo certbot --nginx -d abbaswhispers.com -d www.abbaswhispers.com"
echo "4. Test your site: http://abbaswhispers.com"