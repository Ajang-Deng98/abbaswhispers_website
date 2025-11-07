#!/bin/bash

echo "Applying nginx optimization configuration..."

# Backup current nginx config
sudo cp /etc/nginx/sites-available/abbaswhispers /etc/nginx/sites-available/abbaswhispers.backup

# Create optimized nginx config
sudo tee /etc/nginx/sites-available/abbaswhispers > /dev/null <<'EOF'
server {
    listen 80;
    server_name abbaswhispers.com www.abbaswhispers.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name abbaswhispers.com www.abbaswhispers.com;

    ssl_certificate /etc/letsencrypt/live/abbaswhispers.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/abbaswhispers.com/privkey.pem;

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
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # Static files with long-term caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2|ttf|svg)$ {
        root /var/www/abbaswhispers/frontend/dist;
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Vary Accept-Encoding;
        try_files $uri $uri/ =404;
    }

    # Frontend static files
    location / {
        root /var/www/abbaswhispers/frontend/dist;
        try_files $uri $uri/ /index.html;
        
        # Cache HTML files for shorter time
        location ~* \.html$ {
            expires 1h;
            add_header Cache-Control "public";
        }
    }

    # API requests
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Django admin
    location /admin/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Django static files
    location /static/ {
        alias /var/www/abbaswhispers/django_backend/staticfiles/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Django media files
    location /media/ {
        alias /var/www/abbaswhispers/django_backend/media/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

echo "Testing nginx configuration..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "Reloading nginx..."
    sudo systemctl reload nginx
    echo "Nginx optimization applied successfully!"
else
    echo "Nginx configuration error. Restoring backup..."
    sudo cp /etc/nginx/sites-available/abbaswhispers.backup /etc/nginx/sites-available/abbaswhispers
fi