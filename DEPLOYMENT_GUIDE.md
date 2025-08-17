# Hostinger VPS Deployment Guide

## Prerequisites
- Hostinger VPS account
- Domain name (optional but recommended)
- SSH access to your VPS

## Step 1: VPS Setup

### 1.1 Connect to VPS
```bash
ssh root@your-vps-ip
```

### 1.2 Update System
```bash
apt update && apt upgrade -y
```

### 1.3 Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs
```

### 1.4 Install MySQL
```bash
apt install mysql-server -y
mysql_secure_installation
```

### 1.5 Install Nginx
```bash
apt install nginx -y
systemctl start nginx
systemctl enable nginx
```

### 1.6 Install PM2 (Process Manager)
```bash
npm install -g pm2
```

## Step 2: Database Setup

### 2.1 Create Database
```bash
mysql -u root -p
```

```sql
CREATE DATABASE abba_whispers;
CREATE USER 'abba_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON abba_whispers.* TO 'abba_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 2.2 Import Database Schema
```bash
mysql -u abba_user -p abba_whispers < /path/to/schema.sql
```

## Step 3: Deploy Backend

### 3.1 Upload Backend Files
```bash
# Create directory
mkdir -p /var/www/abba-whispers/backend
cd /var/www/abba-whispers/backend

# Upload your backend files here
# You can use scp, rsync, or git clone
```

### 3.2 Install Dependencies
```bash
npm install
```

### 3.3 Configure Environment
```bash
cp .env.example .env
nano .env
```

Update with production values:
```env
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com

DB_HOST=localhost
DB_USER=abba_user
DB_PASSWORD=your_secure_password
DB_NAME=abba_whispers

JWT_SECRET=your_super_secure_jwt_secret_here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### 3.4 Start Backend with PM2
```bash
pm2 start server.js --name "abba-backend"
pm2 save
pm2 startup
```

## Step 4: Deploy Frontend

### 4.1 Build Frontend Locally
```bash
# On your local machine
npm run build
```

### 4.2 Upload Build Files
```bash
# Upload the build folder to VPS
scp -r build/* root@your-vps-ip:/var/www/abba-whispers/frontend/
```

## Step 5: Nginx Configuration

### 5.1 Create Nginx Config
```bash
nano /etc/nginx/sites-available/abba-whispers
```

Add configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend
    location / {
        root /var/www/abba-whispers/frontend;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        root /var/www/abba-whispers/frontend;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 5.2 Enable Site
```bash
ln -s /etc/nginx/sites-available/abba-whispers /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

## Step 6: SSL Certificate (Optional but Recommended)

### 6.1 Install Certbot
```bash
apt install certbot python3-certbot-nginx -y
```

### 6.2 Get SSL Certificate
```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Step 7: Firewall Setup

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

## Step 8: File Permissions

```bash
chown -R www-data:www-data /var/www/abba-whispers
chmod -R 755 /var/www/abba-whispers
```

## Step 9: Monitoring and Maintenance

### 9.1 Check PM2 Status
```bash
pm2 status
pm2 logs abba-backend
```

### 9.2 Restart Services
```bash
pm2 restart abba-backend
systemctl restart nginx
```

### 9.3 Auto-restart on Reboot
```bash
pm2 startup
pm2 save
```

## Troubleshooting

### Check Logs
```bash
# Backend logs
pm2 logs abba-backend

# Nginx logs
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log

# MySQL logs
tail -f /var/log/mysql/error.log
```

### Common Issues
1. **Port conflicts**: Ensure port 5000 is free
2. **Database connection**: Check MySQL credentials
3. **File permissions**: Ensure www-data owns files
4. **Firewall**: Check if ports are open

## Production Checklist
- [ ] Database secured with strong password
- [ ] Environment variables set correctly
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] PM2 auto-restart enabled
- [ ] Regular backups scheduled
- [ ] Monitoring setup