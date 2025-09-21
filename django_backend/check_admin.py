#!/usr/bin/env python
"""
Check admin setup and display instructions
"""

import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'abba_whispers.settings')
django.setup()

from django.contrib.auth.models import User
from api.models import PrayerRequest

def check_admin_setup():
    print("Django Admin Setup Check")
    print("=" * 40)
    
    # Check superuser
    superusers = User.objects.filter(is_superuser=True)
    print(f"Superusers found: {superusers.count()}")
    for user in superusers:
        print(f"  - Username: {user.username}")
        print(f"  - Email: {user.email}")
    
    # Check prayer requests
    prayers = PrayerRequest.objects.all()
    print(f"\nPrayer requests in database: {prayers.count()}")
    for prayer in prayers[:3]:
        print(f"  - ID: {prayer.id}, Name: {prayer.name or 'Anonymous'}")
        print(f"    Category: {prayer.category}, Status: {prayer.status}")
        print(f"    Created: {prayer.created_at}")
    
    print("\n" + "=" * 40)
    print("TO ACCESS ADMIN PANEL:")
    print("1. Start Django server:")
    print("   python manage.py runserver 0.0.0.0:5003")
    print("\n2. Open browser and go to:")
    print("   http://localhost:5003/admin")
    print("\n3. Login with superuser credentials")
    print("\n4. Click on 'Prayer requests' to see all submissions")
    print("\n5. You should see all prayer requests listed there")
    
    if prayers.count() > 0:
        print(f"\nYou should see {prayers.count()} prayer requests in the admin panel")
    else:
        print("\nNo prayer requests found. Submit one from the frontend first.")

if __name__ == "__main__":
    check_admin_setup()