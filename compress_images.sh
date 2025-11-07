#!/bin/bash

echo "Installing ImageMagick..."
sudo apt update
sudo apt install -y imagemagick

echo "Compressing images in frontend/public/images..."

# Create backup directory
mkdir -p frontend/public/images/backup

# Copy originals to backup
cp frontend/public/images/*.{jpg,jpeg,png} frontend/public/images/backup/ 2>/dev/null || true

# Compress JPG/JPEG files to 85% quality
find frontend/public/images -maxdepth 1 -name "*.jpg" -o -name "*.jpeg" | while read file; do
    echo "Compressing $file..."
    convert "$file" -quality 85 -strip "$file"
done

# Compress PNG files
find frontend/public/images -maxdepth 1 -name "*.png" | while read file; do
    echo "Compressing $file..."
    convert "$file" -strip "$file"
done

echo "Image compression complete!"
echo "Originals backed up to frontend/public/images/backup/"