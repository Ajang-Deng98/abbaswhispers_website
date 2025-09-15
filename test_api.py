#!/usr/bin/env python3
import requests
import json

# Test API endpoints
BASE_URL = "http://localhost:8000/api"

def test_endpoint(endpoint, name):
    try:
        response = requests.get(f"{BASE_URL}/{endpoint}/")
        print(f"\n{name}:")
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                print(f"Count: {len(data)}")
                if data:
                    print(f"Sample: {data[0].get('title', data[0])}")
            else:
                print(f"Data: {data}")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"{name} Error: {e}")

if __name__ == "__main__":
    print("Testing API endpoints...")
    test_endpoint("blog", "Blog Posts")
    test_endpoint("volumes", "Volumes")
    test_endpoint("testimonials", "Testimonials")
    test_endpoint("health", "Health Check")