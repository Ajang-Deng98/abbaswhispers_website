#!/bin/bash

# Build script for Netlify deployment
echo "Starting Netlify build process..."

# Navigate to frontend directory
cd frontend

# Install dependencies
echo "Installing dependencies..."
npm ci

# Set environment variables for production
export REACT_APP_API_URL="https://abbawhispers-backend.herokuapp.com/api"
export GENERATE_SOURCEMAP=false
export PUBLIC_URL="."

# Build the React app
echo "Building React application..."
CI=false npm run build

# Copy build files to root for Netlify
echo "Preparing build files..."
cp -r build/* ../

echo "Build completed successfully!"
echo "Files ready for Netlify deployment"