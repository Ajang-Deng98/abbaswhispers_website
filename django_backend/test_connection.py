#!/usr/bin/env python
"""
Test script to verify API, Backend, and Database connectivity
"""
import os
import sys
import django
from django.conf import settings

# Add the project directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'abba_whispers.settings')
django.setup()

from django.db import connection
from django.core.management import execute_from_command_line
from api.models import BlogPost, Volume, PrayerRequest, ContactMessage, Subscriber
import requests
import json

def test_database_connection():
    """Test PostgreSQL database connection"""
    print("Testing Database Connection...")
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT version();")
            version = cursor.fetchone()[0]
            print(f"[OK] Database Connected: {version}")
            return True
    except Exception as e:
        print(f"[ERROR] Database Connection Failed: {e}")
        return False

def test_models():
    """Test Django models"""
    print("\nTesting Django Models...")
    try:
        # Test each model
        models_to_test = [
            ('BlogPost', BlogPost),
            ('Volume', Volume),
            ('PrayerRequest', PrayerRequest),
            ('ContactMessage', ContactMessage),
            ('Subscriber', Subscriber)
        ]
        
        for model_name, model_class in models_to_test:
            count = model_class.objects.count()
            print(f"[OK] {model_name}: {count} records")
        
        return True
    except Exception as e:
        print(f"[ERROR] Models Test Failed: {e}")
        return False

def test_api_endpoints():
    """Test API endpoints"""
    print("\nTesting API Endpoints...")
    base_url = "http://localhost:8000/api"
    
    endpoints = [
        '/health/',
        '/blog/',
        '/volumes/',
        '/prayers/',
        '/contact/',
        '/subscribers/'
    ]
    
    results = []
    for endpoint in endpoints:
        try:
            response = requests.get(f"{base_url}{endpoint}", timeout=5)
            if response.status_code in [200, 201]:
                print(f"[OK] {endpoint}: Status {response.status_code}")
                results.append(True)
            else:
                print(f"[WARNING] {endpoint}: Status {response.status_code}")
                results.append(False)
        except requests.exceptions.ConnectionError:
            print(f"[ERROR] {endpoint}: Server not running")
            results.append(False)
        except Exception as e:
            print(f"[ERROR] {endpoint}: {e}")
            results.append(False)
    
    return all(results)

def test_crud_operations():
    """Test Create, Read, Update, Delete operations"""
    print("\nTesting CRUD Operations...")
    try:
        # Test ContactMessage model CRUD
        print("Testing ContactMessage model...")
        
        # Create
        contact = ContactMessage.objects.create(
            name="Test User",
            email="test@example.com",
            subject="Test Subject",
            message="Test message for connectivity check"
        )
        print(f"[OK] Created ContactMessage: ID {contact.id}")
        
        # Read
        retrieved = ContactMessage.objects.get(id=contact.id)
        print(f"[OK] Retrieved ContactMessage: {retrieved.name}")
        
        # Update
        retrieved.message = "Updated test message"
        retrieved.save()
        print("[OK] Updated ContactMessage message")
        
        # Delete
        retrieved.delete()
        print("[OK] Deleted test ContactMessage")
        
        return True
    except Exception as e:
        print(f"[ERROR] CRUD Operations Failed: {e}")
        return False

def test_api_post_request():
    """Test API POST request"""
    print("\nTesting API POST Request...")
    try:
        url = "http://localhost:8000/api/contact/"
        data = {
            "name": "API Test User",
            "email": "apitest@example.com",
            "subject": "API Test",
            "message": "Testing API connectivity"
        }
        
        response = requests.post(url, json=data, timeout=5)
        if response.status_code in [200, 201]:
            print(f"[OK] POST Request Successful: Status {response.status_code}")
            
            # Clean up - delete the test record
            try:
                ContactMessage.objects.filter(email="apitest@example.com").delete()
                print("[OK] Cleaned up test data")
            except:
                pass
            
            return True
        else:
            print(f"[ERROR] POST Request Failed: Status {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("[ERROR] API Server not running")
        return False
    except Exception as e:
        print(f"[ERROR] POST Request Failed: {e}")
        return False

def main():
    """Run all tests"""
    print("Starting Connectivity Tests for Abba's Whispers Website\n")
    
    tests = [
        ("Database Connection", test_database_connection),
        ("Django Models", test_models),
        ("CRUD Operations", test_crud_operations),
        ("API Endpoints", test_api_endpoints),
        ("API POST Request", test_api_post_request)
    ]
    
    results = []
    for test_name, test_func in tests:
        print(f"\n{'='*50}")
        print(f"Running: {test_name}")
        print('='*50)
        result = test_func()
        results.append((test_name, result))
    
    # Summary
    print(f"\n{'='*50}")
    print("TEST SUMMARY")
    print('='*50)
    
    passed = 0
    for test_name, result in results:
        status = "[PASSED]" if result else "[FAILED]"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\nOverall: {passed}/{len(results)} tests passed")
    
    if passed == len(results):
        print("\nAll systems are working correctly!")
        print("[OK] Database: Connected")
        print("[OK] Backend: Functional") 
        print("[OK] API: Responsive")
        print("[OK] Models: Working")
        print("[OK] CRUD: Operational")
    else:
        print(f"\n[WARNING] {len(results) - passed} test(s) failed. Check the output above.")
        
        if not any(result for _, result in results[:3]):  # First 3 are backend tests
            print("\nSuggestions:")
            print("1. Make sure PostgreSQL is running")
            print("2. Check database credentials in .env file")
            print("3. Run: python manage.py migrate")
        
        if not any(result for _, result in results[3:]):  # Last 2 are API tests
            print("4. Start Django server: python manage.py runserver")

if __name__ == "__main__":
    main()