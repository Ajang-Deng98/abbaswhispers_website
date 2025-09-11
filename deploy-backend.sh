#!/bin/bash

echo "🚀 Deploying Abbaswhispers Backend to Heroku..."

# Check if heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo "❌ Heroku CLI not found. Please install it first:"
    echo "   https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

# Create Heroku app
echo "📱 Creating Heroku app..."
heroku create abbawhispers-backend-$(date +%s)

# Add PostgreSQL addon
echo "🗄️ Adding PostgreSQL database..."
heroku addons:create heroku-postgresql:mini

# Set environment variables
echo "⚙️ Setting environment variables..."
heroku config:set DEBUG=False
heroku config:set SECRET_KEY=b09d71b806c624a2aad97d875b1588ced8cbd2651da71dd181dffd528c06b9cb088f57251968243695df891187c3287a93dcf848a3010e226c563dfc18cd7dd1
heroku config:set CORS_ALLOWED_ORIGINS=https://your-netlify-site.netlify.app

# Deploy backend
echo "🚀 Deploying to Heroku..."
git subtree push --prefix=django_backend heroku main

echo "✅ Backend deployed successfully!"
echo "📋 Next steps:"
echo "   1. Update your Netlify environment variable:"
echo "      REACT_APP_API_URL=https://your-heroku-app.herokuapp.com/api"
echo "   2. Redeploy your frontend on Netlify"
echo "   3. Test your website!"