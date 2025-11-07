#!/bin/bash

# Nginx optimization for faster image loading
echo "🚀 Optimizing nginx for faster image loading..."

# Update nginx configuration
sudo tee /etc/nginx/sites-available/abbaswhispers << 'EOF'
server {
    server_name abbaswhispers.com www.abbaswhispers.com 46.202.141.138;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json
        image/svg+xml;

    location = /favicon.ico {
        access_log off;
        log_not_found off;
    }

    # Static files with long cache
    location /static/ {
        alias /var/www/abbaswhispers/django_backend/staticfiles/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Vary Accept-Encoding;
    }

    # Media files with long cache
    location /media/ {
        alias /var/www/abbaswhispers/django_backend/media/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Vary Accept-Encoding;
    }

    # Image files with aggressive caching
    location ~* \.(jpg|jpeg|png|gif|ico|svg|webp)$ {
        root /var/www/abbaswhispers/frontend/dist;
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Vary Accept-Encoding;
        try_files $uri =404;
    }

    # API endpoints
    location /api/ {
        include proxy_params;
        proxy_pass http://unix:/var/www/abbaswhispers/abbaswhispers.sock;
    }

    # Admin panel
    location /admin/ {
        include proxy_params;
        proxy_pass http://unix:/var/www/abbaswhispers/abbaswhispers.sock;
    }

    # Frontend files
    location / {
        root /var/www/abbaswhispers/frontend/dist;
        try_files $uri $uri/ /index.html;
        expires 1h;
        add_header Cache-Control "public";
    }

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/abbaswhispers.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/abbaswhispers.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    if ($host = www.abbaswhispers.com) {
        return 301 https://$host$request_uri;
    }

    if ($host = abbaswhispers.com) {
        return 301 https://$host$request_uri;
    }

    listen 80;
    server_name abbaswhispers.com www.abbaswhispers.com 46.202.141.138;
    return 404;
}
EOF

# Test and restart nginx
sudo nginx -t && sudo systemctl restart nginx

echo "✅ Nginx optimized for faster image loading!"