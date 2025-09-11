import requests
import json

# Test API endpoints
BASE_URL = 'http://localhost:8000/api'

def test_endpoints():
    endpoints = [
        '/health/',
        '/blog/',
        '/volumes/',
        '/testimonials/'
    ]
    
    print("Testing API endpoints...")
    
    for endpoint in endpoints:
        try:
            response = requests.get(f"{BASE_URL}{endpoint}", timeout=5)
            print(f"✅ {endpoint}: {response.status_code}")
            if endpoint == '/blog/' and response.status_code == 200:
                data = response.json()
                print(f"   Found {len(data)} blog posts")
            elif endpoint == '/volumes/' and response.status_code == 200:
                data = response.json()
                print(f"   Found {len(data)} volumes")
        except requests.exceptions.RequestException as e:
            print(f"❌ {endpoint}: Connection failed - {e}")
    
    print("\nAPI test completed!")

if __name__ == "__main__":
    test_endpoints()