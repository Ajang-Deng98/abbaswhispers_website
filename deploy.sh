#!/bin/bash

# Deployment script for Hostinger
echo "Starting deployment..."

# Install dependencies
pip install -r requirements.txt

# Navigate to Django backend
cd django_backend

# Collect static files
python manage.py collectstatic --noinput --settings=abba_whispers.settings_prod

# Run migrations
python manage.py migrate --settings=abba_whispers.settings_prod

# Build React frontend
cd ../frontend
npm install
npm run build

echo "Deployment completed!"