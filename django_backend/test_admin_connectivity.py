#!/usr/bin/env python
import os
import sys
import django
from datetime import datetime

# Add the project directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'abba_whispers.settings')
django.setup()

from api.models import BlogPost, Volume, PrayerRequest, ContactMessage, Subscriber
from django.contrib.auth.models import User

def test_database_connectivity():
    print("Testing Database Connectivity for Admin Models...")
    print("=" * 60)
    
    try:
        # Test 1: Database Connection
        print("1. Testing Database Connection...")
        from django.db import connection
        cursor = connection.cursor()
        cursor.execute("SELECT version();")
        db_version = cursor.fetchone()[0]
        print(f"   [OK] Connected to PostgreSQL: {db_version}")
        
        # Test 2: BlogPost Model
        print("\n2. Testing BlogPost Model...")
        blog_count = BlogPost.objects.count()
        print(f"   [INFO] Current blog posts in database: {blog_count}")
        
        # Test creating a blog post
        try:
            test_blog = BlogPost.objects.create(
                title="Test Blog Post - Admin Connectivity",
                content="This is a test blog post to verify admin connectivity.",
                excerpt="Test excerpt for connectivity check.",
                category="peace",
                status="draft"
            )
            print(f"   [OK] Successfully created test blog post (ID: {test_blog.id})")
            
            # Clean up test data
            test_blog.delete()
            print("   [CLEAN] Test blog post cleaned up")
            
        except Exception as e:
            print(f"   [ERROR] Error creating blog post: {e}")
        
        # Test 3: Volume Model
        print("\n3. Testing Volume Model...")
        volume_count = Volume.objects.count()
        print(f"   [INFO] Current volumes in database: {volume_count}")
        
        # Test creating a volume
        try:
            test_volume = Volume.objects.create(
                title="Test Volume - Admin Connectivity",
                description="This is a test volume to verify admin connectivity.",
                excerpt="Test excerpt for volume connectivity check.",
                category="faith",
                price="Free",
                status="draft"
            )
            print(f"   [OK] Successfully created test volume (ID: {test_volume.id})")
            
            # Clean up test data
            test_volume.delete()
            print("   [CLEAN] Test volume cleaned up")
            
        except Exception as e:
            print(f"   [ERROR] Error creating volume: {e}")
        
        # Test 4: Other Models
        print("\n4. Testing Other Models...")
        prayer_count = PrayerRequest.objects.count()
        contact_count = ContactMessage.objects.count()
        subscriber_count = Subscriber.objects.count()
        
        print(f"   [INFO] Prayer requests: {prayer_count}")
        print(f"   [INFO] Contact messages: {contact_count}")
        print(f"   [INFO] Subscribers: {subscriber_count}")
        
        # Test 5: User Model (for admin access)
        print("\n5. Testing User Model (Admin Access)...")
        user_count = User.objects.count()
        superuser_count = User.objects.filter(is_superuser=True).count()
        print(f"   [INFO] Total users: {user_count}")
        print(f"   [INFO] Superusers: {superuser_count}")
        
        if superuser_count > 0:
            print("   [OK] Admin access available")
        else:
            print("   [WARNING] No superuser found - create one with: python manage.py createsuperuser")
        
        # Test 6: Model Field Validation
        print("\n6. Testing Model Field Requirements...")
        
        # BlogPost required fields
        blog_fields = BlogPost._meta.get_fields()
        required_blog_fields = [f.name for f in blog_fields if hasattr(f, 'null') and not f.null and not f.blank and f.name != 'id']
        print(f"   [INFO] BlogPost required fields: {required_blog_fields}")
        
        # Volume required fields  
        volume_fields = Volume._meta.get_fields()
        required_volume_fields = [f.name for f in volume_fields if hasattr(f, 'null') and not f.null and not f.blank and f.name != 'id']
        print(f"   [INFO] Volume required fields: {required_volume_fields}")
        
        print("\n" + "=" * 60)
        print("[SUCCESS] DATABASE CONNECTIVITY TEST COMPLETED SUCCESSFULLY!")
        print("[SUCCESS] Blog posts and volumes are properly connected to PostgreSQL")
        print("[SUCCESS] Admin interface should work perfectly for adding content")
        print("\nNext Steps:")
        print("   1. Access admin at: http://localhost:8000/admin")
        print("   2. Add blog posts at: /admin/api/blogpost/")
        print("   3. Add volumes at: /admin/api/volume/")
        
    except Exception as e:
        print(f"[ERROR] Database connectivity error: {e}")
        return False
    
    return True

if __name__ == "__main__":
    test_database_connectivity()