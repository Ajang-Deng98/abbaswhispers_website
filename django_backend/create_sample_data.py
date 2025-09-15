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
from django.contrib.auth.models import User

def create_sample_data():
    # Create admin user if doesn't exist
    admin_user, created = User.objects.get_or_create(
        username='admin',
        defaults={'email': 'admin@abbawhispers.com', 'is_staff': True, 'is_superuser': True}
    )
    if created:
        admin_user.set_password('admin123')
        admin_user.save()
        print("Created admin user: admin/admin123")

    # Create sample blog posts
    blog_posts = [
        {
            'title': 'Finding Peace in the Psalms',
            'content': '<p>Discover how the ancient words of the Psalms can bring peace to our modern struggles and anxieties.</p><p>When David wrote "The Lord is my shepherd," he was declaring a truth that transcends time.</p>',
            'excerpt': 'Discover how the ancient words of the Psalms can bring peace to our modern struggles and anxieties.',
            'category': 'peace',
            'tags': 'peace,psalms,comfort',
            'status': 'published',
            'author': admin_user
        },
        {
            'title': 'Gratitude in Every Season',
            'content': '<p>Learning to cultivate a heart of thanksgiving through life\'s ups and downs, inspired by Psalm 23.</p><p>Even in difficult seasons, we can find reasons to praise.</p>',
            'excerpt': 'Learning to cultivate a heart of thanksgiving through life\'s ups and downs.',
            'category': 'gratitude',
            'tags': 'gratitude,thanksgiving,seasons',
            'status': 'published',
            'author': admin_user
        },
        {
            'title': 'Strength for the Journey',
            'content': '<p>How God\'s promises in the Psalms provide strength and courage for life\'s difficult moments.</p><p>His strength is made perfect in our weakness.</p>',
            'excerpt': 'How God\'s promises provide strength and courage for life\'s difficult moments.',
            'category': 'strength',
            'tags': 'strength,courage,journey',
            'status': 'published',
            'author': admin_user
        }
    ]

    for post_data in blog_posts:
        post, created = BlogPost.objects.get_or_create(
            title=post_data['title'],
            defaults=post_data
        )
        if created:
            print(f"Created blog post: {post.title}")

    # Create sample volumes
    volumes = [
        {
            'title': 'SELAH - Volume 1: Thanksgiving',
            'description': 'A collection of poems celebrating gratitude and God\'s faithfulness in our lives.',
            'content': '''<div style="font-family: Georgia, serif; line-height: 1.8;">
<h3>In Every Breath</h3>
<p><em>In every breath I take today,<br>
I find a reason to give praise.<br>
For morning light that breaks the dawn,<br>
For strength to face what lies beyond.</em></p>

<p style="text-align: center; font-weight: bold; color: #d4af37;">Selah - pause and reflect</p>

<p><em>Your faithfulness, O Lord, endures,<br>
Through every storm, Your love ensures<br>
That I am held, that I am known,<br>
Never walking this path alone.</em></p>
</div>''',
            'category': 'thanksgiving',
            'price': 'Free',
            'status': 'published'
        },
        {
            'title': 'SELAH - Volume 2: Wonder',
            'description': 'Poems that capture the awe and wonder of God\'s creation and love.',
            'content': '''<div style="font-family: Georgia, serif; line-height: 1.8;">
<h3>Beneath the Stars</h3>
<p><em>I stand beneath the starlit sky,<br>
And wonder at Your majesty.<br>
Each twinkling light, a testament<br>
To power beyond what I can see.</em></p>

<p style="text-align: center; font-weight: bold; color: #d4af37;">Selah - pause and reflect</p>

<p><em>How can it be that You who made<br>
The galaxies with just Your word,<br>
Would bend Your ear to hear my prayer,<br>
And call me precious, call me heard?</em></p>
</div>''',
            'category': 'wonder',
            'price': 'Free',
            'status': 'published'
        }
    ]

    for volume_data in volumes:
        volume, created = Volume.objects.get_or_create(
            title=volume_data['title'],
            defaults=volume_data
        )
        if created:
            print(f"Created volume: {volume.title}")

    # Create sample testimonials
    testimonials = [
        {
            'author_name': 'Sarah M.',
            'author_role': 'Mother of Three',
            'quote': 'The SELAH series has been a source of comfort during my darkest moments. These poems speak directly to the heart.',
            'status': 'published',
            'order': 1
        },
        {
            'author_name': 'David K.',
            'author_role': 'Pastor',
            'quote': 'Uzo\'s poetry captures the essence of the Psalms in a contemporary voice. I often share these with my congregation.',
            'status': 'published',
            'order': 2
        }
    ]

    for testimonial_data in testimonials:
        testimonial, created = Testimonial.objects.get_or_create(
            author_name=testimonial_data['author_name'],
            defaults=testimonial_data
        )
        if created:
            print(f"Created testimonial: {testimonial.author_name}")

    print("\nSample data created successfully!")
    print("You can now:")
    print("1. Start Django server: python manage.py runserver")
    print("2. Visit admin: http://localhost:8000/admin (admin/admin123)")
    print("3. Check API: http://localhost:8000/api/blog/")
    print("4. View website: http://localhost:3000")

if __name__ == '__main__':
    create_sample_data()