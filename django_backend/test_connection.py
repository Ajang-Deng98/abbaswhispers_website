#!/usr/bin/env python
"""
Quick test to verify Django backend is working
"""

import os
import django
import requests
import json

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'abba_whispers.settings')
django.setup()

from api.models import PrayerRequest

def test_prayer_model():
    """Test prayer request model"""
    print("Testing Prayer Request model...")
    
    # Create a test prayer request
    prayer = PrayerRequest.objects.create(
        name="Test User",
        email="test@example.com",
        category="healing",
        request="Test prayer request",
        is_anonymous=False,
        allow_sharing=True
    )
    
    print(f"✓ Created prayer request with ID: {prayer.id}")
    
    # Verify it was saved
    saved_prayer = PrayerRequest.objects.get(id=prayer.id)
    print(f"✓ Retrieved prayer request: {saved_prayer.name}")
    
    # Clean up
    prayer.delete()
    print("✓ Test prayer request deleted")
    
    return True

def test_api_endpoint():
    """Test API endpoint if server is running"""
    try:
        # Test health endpoint
        response = requests.get("http://localhost:5003/api/health/", timeout=5)
        if response.status_code == 200:
            print("✓ Health endpoint working")
            
            # Test prayer request endpoint
            test_data = {
                "name": "API Test User",
                "email": "apitest@example.com", 
                "category": "healing",
                "request": "API test prayer request",
                "is_anonymous": False,
                "allow_sharing": True
            }
            
            response = requests.post(
                "http://localhost:5003/api/prayers/",
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=5
            )
            
            if response.status_code in [200, 201]:
                print("✓ Prayer request API endpoint working")
                return True
            else:
                print(f"✗ Prayer request API returned status: {response.status_code}")
                print(f"Response: {response.text}")
                return False
        else:
            print(f"✗ Health endpoint returned status: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"✗ API server not running: {e}")
        return False

if __name__ == "__main__":
    print("Django Backend Test")
    print("=" * 30)
    
    # Test model
    try:
        test_prayer_model()
        print("\n✓ Database models working correctly")
    except Exception as e:
        print(f"\n✗ Database error: {e}")
    
    # Test API
    print("\n" + "=" * 30)
    print("Testing API endpoints...")
    if test_api_endpoint():
        print("\n✓ API endpoints working correctly")
    else:
        print("\n✗ API endpoints not working")
        print("Start Django server with: python manage.py runserver 0.0.0.0:5003")
    
    print("\nTest completed!")