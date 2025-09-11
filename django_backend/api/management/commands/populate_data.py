from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import BlogPost, Volume, Testimonial, PrayerTestimonial, Book
from datetime import datetime

class Command(BaseCommand):
    help = 'Populate database with sample data'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample data...')
        
        # Create superuser if not exists
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@abbawhispers.com', 'admin123')
            self.stdout.write('Created admin user')
        
        admin_user = User.objects.get(username='admin')
        
        # Create Blog Posts
        blog_posts = [
            {
                'title': 'Finding Peace in the Psalms',
                'content': 'The Psalms offer us a roadway to peace in times of trouble. When David wrote "The Lord is my shepherd, I shall not want," he was declaring a truth that transcends time and circumstance.',
                'excerpt': 'Discover how the ancient words of the Psalms can bring peace to our modern struggles and anxieties.',
                'category': 'peace',
                'tags': 'peace,psalms,comfort',
                'status': 'published',
                'author': admin_user
            },
            {
                'title': 'Gratitude in Every Season',
                'content': 'Learning to cultivate a heart of thanksgiving is one of the most transformative practices we can embrace. Even in difficult seasons, we can find reasons to praise.',
                'excerpt': 'Learning to cultivate a heart of thanksgiving through life\'s ups and downs, inspired by Psalm 23.',
                'category': 'gratitude',
                'tags': 'gratitude,thanksgiving,seasons',
                'status': 'published',
                'author': admin_user
            },
            {
                'title': 'Strength for the Journey',
                'content': 'When we feel weak and overwhelmed, God\'s promises in the Psalms remind us that His strength is made perfect in our weakness.',
                'excerpt': 'How God\'s promises in the Psalms provide strength and courage for life\'s difficult moments.',
                'category': 'strength',
                'tags': 'strength,courage,journey',
                'status': 'published',
                'author': admin_user
            }
        ]
        
        for post_data in blog_posts:
            if not BlogPost.objects.filter(title=post_data['title']).exists():
                BlogPost.objects.create(**post_data)
                self.stdout.write(f'Created blog post: {post_data["title"]}')
        
        # Create Volumes
        volumes = [
            {
                'title': 'SELAH - Volume 1: Thanksgiving',
                'description': 'A collection of poems celebrating gratitude and God\'s faithfulness in our lives. Each piece reflects on the beauty of thanksgiving in both joyful and challenging seasons.',
                'excerpt': 'Poems of gratitude and thanksgiving',
                'category': 'thanksgiving',
                'price': 'Free',
                'content': 'In every breath I take today,\nI find a reason to give praise.\nFor morning light that breaks the dawn,\nFor strength to face what lies beyond.\n\nSelah - pause and reflect\n\nYour faithfulness, O Lord, endures,\nThrough every storm, Your love ensures\nThat I am held, that I am known,\nNever walking this path alone.',
                'status': 'published'
            },
            {
                'title': 'SELAH - Volume 2: Wonder',
                'description': 'Poems that capture the awe and wonder of God\'s creation and love. From the vastness of the sky to the intimacy of His presence.',
                'excerpt': 'Capturing awe and wonder in verse',
                'category': 'wonder',
                'price': 'Free',
                'content': 'I stand beneath the starlit sky,\nAnd wonder at Your majesty.\nEach twinkling light, a testament\nTo power beyond what I can see.\n\nSelah - pause and reflect\n\nHow can it be that You who made\nThe galaxies with just Your word,\nWould bend Your ear to hear my prayer,\nAnd call me precious, call me heard?',
                'status': 'published'
            },
            {
                'title': 'SELAH - Volume 3: Faith',
                'description': 'Reflections on faith, trust, and walking with God through life\'s journey. These poems explore the depths of believing when we cannot see.',
                'excerpt': 'Reflections on faith and trust',
                'category': 'faith',
                'price': 'Free',
                'content': 'When shadows fall and doubts arise,\nAnd faith feels fragile in my chest,\nI choose to trust what I cannot see,\nTo find in You my place of rest.\n\nSelah - pause and reflect\n\nFor faith is not the absence of fear,\nBut courage to believe You\'re near.\nIn every valley, every height,\nYou are my anchor, You are my light.',
                'status': 'published'
            }
        ]
        
        for volume_data in volumes:
            if not Volume.objects.filter(title=volume_data['title']).exists():
                Volume.objects.create(**volume_data)
                self.stdout.write(f'Created volume: {volume_data["title"]}')
        
        # Create Testimonials
        testimonials = [
            {
                'author_name': 'Sarah M.',
                'author_role': 'Mother of Three',
                'quote': 'The SELAH series has been a source of comfort during my darkest moments. These poems speak directly to the heart and remind me of God\'s unfailing love.',
                'status': 'published',
                'order': 1
            },
            {
                'author_name': 'David K.',
                'author_role': 'Pastor',
                'quote': 'Uzo\'s poetry captures the essence of the Psalms in a contemporary voice. I often share these verses with my congregation during difficult seasons.',
                'status': 'published',
                'order': 2
            },
            {
                'author_name': 'Maria L.',
                'author_role': 'Grief Counselor',
                'quote': 'As someone who works with people in grief, I find these poems offer hope and healing. The SELAH moments provide space for reflection and peace.',
                'status': 'published',
                'order': 3
            }
        ]
        
        for testimonial_data in testimonials:
            if not Testimonial.objects.filter(author_name=testimonial_data['author_name']).exists():
                Testimonial.objects.create(**testimonial_data)
                self.stdout.write(f'Created testimonial: {testimonial_data["author_name"]}')
        
        self.stdout.write(self.style.SUCCESS('Successfully populated database with sample data'))