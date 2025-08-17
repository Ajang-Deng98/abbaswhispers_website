#!/bin/bash

# Deployment script for Hostinger VPS
# Run this script on your VPS after uploading files

echo "Starting Abba Whispers deployment..."

# Variables
APP_DIR="/var/www/abba-whispers"
BACKEND_DIR="$APP_DIR/backend"
FRONTEND_DIR="$APP_DIR/frontend"

# Create directories
sudo mkdir -p $APP_DIR
sudo mkdir -p $BACKEND_DIR
sudo mkdir -p $FRONTEND_DIR
sudo mkdir -p $BACKEND_DIR/logs
sudo mkdir -p $BACKEND_DIR/uploads

# Set permissions
sudo chown -R $USER:$USER $APP_DIR

# Install backend dependencies
echo "Installing backend dependencies..."
cd $BACKEND_DIR
npm install --production

# Copy environment file
if [ ! -f .env ]; then
    cp .env.production .env
    echo "Please edit $BACKEND_DIR/.env with your production values"
fi

# Setup database
echo "Setting up database..."
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS abba_whispers;"
mysql -u root -p -e "CREATE USER IF NOT EXISTS 'abba_user'@'localhost' IDENTIFIED BY 'your_password';"
mysql -u root -p -e "GRANT ALL PRIVILEGES ON abba_whispers.* TO 'abba_user'@'localhost';"
mysql -u root -p -e "FLUSH PRIVILEGES;"

# Import database schema
if [ -f "../database/schema.sql" ]; then
    mysql -u abba_user -p abba_whispers < ../database/schema.sql
fi

# Setup PM2
echo "Setting up PM2..."
pm2 delete abba-whispers-backend 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Setup Nginx
echo "Setting up Nginx..."
sudo cp ../nginx.conf /etc/nginx/sites-available/abba-whispers
sudo ln -sf /etc/nginx/sites-available/abba-whispers /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Set final permissions
sudo chown -R www-data:www-data $FRONTEND_DIR
sudo chmod -R 755 $APP_DIR

echo "Deployment completed!"
echo "Don't forget to:"
echo "1. Update .env file with production values"
echo "2. Setup SSL certificate with: sudo certbot --nginx -d yourdomain.com"
echo "3. Update domain in nginx.conf and ecosystem.config.js"