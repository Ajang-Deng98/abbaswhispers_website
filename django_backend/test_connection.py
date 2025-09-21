#!/usr/bin/env python3
import os
import django
import sys

# Add the project directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'abba_whispers.settings')
django.setup()

from api.models import BlogPost, Volume, Testimonial
from django.db import connection

def test_database_connection():
    print("Testing database connection...")
    
    try:
        # Test database connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            result = cursor.fetchone()
            print(f"[OK] Database connection successful: {result}")
        
        # Test model queries
        blog_count = BlogPost.objects.count()
        volume_count = Volume.objects.count()
        testimonial_count = Testimonial.objects.count()
        
        print(f"\nDatabase counts:")
        print(f"Blog Posts: {blog_count}")
        print(f"Volumes: {volume_count}")
        print(f"Testimonials: {testimonial_count}")
        
        # Test published content
        published_blogs = BlogPost.objects.filter(status='published').count()
        published_volumes = Volume.objects.filter(status='published').count()
        published_testimonials = Testimonial.objects.filter(status='published').count()
        
        print(f"\nPublished content:")
        print(f"Published Blog Posts: {published_blogs}")
        print(f"Published Volumes: {published_volumes}")
        print(f"Published Testimonials: {published_testimonials}")
        
        # Show sample data
        if published_blogs > 0:
            print(f"\nSample Blog Posts:")
            for post in BlogPost.objects.filter(status='published')[:3]:
                print(f"  - {post.title} ({post.category})")
        
        if published_volumes > 0:
            print(f"\nSample Volumes:")
            for volume in Volume.objects.filter(status='published')[:3]:
                print(f"  - {volume.title} ({volume.category})")
                
        return True
        
    except Exception as e:
        print(f"[ERROR] Database error: {e}")
        return False

if __name__ == '__main__':
    test_database_connection()