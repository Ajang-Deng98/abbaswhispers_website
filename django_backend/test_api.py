#!/usr/bin/env python
"""
Test API communication flow
"""

import os
import django
import requests
import json

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'abba_whispers.settings')
django.setup()

from api.models import PrayerRequest, BlogPost, Volume

def test_api_endpoints():
    """Test all API endpoints"""
    base_url = "http://localhost:5003/api"
    
    endpoints = [
        ("/health/", "GET"),
        ("/blog/", "GET"),
        ("/volumes/", "GET"),
        ("/prayers/", "GET"),
        ("/contact/", "GET"),
        ("/subscribers/", "GET"),
    ]
    
    print("Testing API endpoints...")
    for endpoint, method in endpoints:
        try:
            if method == "GET":
                response = requests.get(f"{base_url}{endpoint}", timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    print(f"✓ {endpoint} - {len(data)} items")
                elif isinstance(data, dict) and 'results' in data:
                    print(f"✓ {endpoint} - {len(data['results'])} items")
                else:
                    print(f"✓ {endpoint} - OK")
            else:
                print(f"✗ {endpoint} - Status: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            print(f"✗ {endpoint} - Error: {e}")

def test_prayer_submission():
    """Test prayer request submission"""
    print("\nTesting prayer request submission...")
    
    test_data = {
        "name": "API Test User",
        "email": "test@example.com",
        "category": "healing",
        "request": "Test prayer request from API",
        "is_anonymous": False,
        "allow_sharing": True
    }
    
    try:
        response = requests.post(
            "http://localhost:5003/api/prayers/",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=5
        )
        
        if response.status_code in [200, 201]:
            print("✓ Prayer request submitted successfully")
            data = response.json()
            print(f"  Created prayer ID: {data.get('id')}")
            return True
        else:
            print(f"✗ Prayer submission failed - Status: {response.status_code}")
            print(f"  Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"✗ Prayer submission error: {e}")
        return False

if __name__ == "__main__":
    print("API Communication Test")
    print("=" * 30)
    
    # Test database first
    print("Database status:")
    print(f"  Prayer requests: {PrayerRequest.objects.count()}")
    print(f"  Blog posts: {BlogPost.objects.count()}")
    print(f"  Volumes: {Volume.objects.count()}")
    
    print("\n" + "=" * 30)
    
    # Test API endpoints
    test_api_endpoints()
    
    # Test prayer submission
    test_prayer_submission()
    
    print("\nTest completed!")
    print("Start Django server with: python manage.py runserver 0.0.0.0:5003")