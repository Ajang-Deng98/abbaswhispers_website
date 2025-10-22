#!/usr/bin/env python
import os
import sys
import django

# Setup Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'abba_whispers.settings')
django.setup()

from api.models import BlogPost, Volume
from django.utils import timezone

def create_sample_data():
    # Create sample blog posts
    blog_posts = [
        {
            'title': 'Finding Peace in Psalm 23',
            'content': '''The Lord is my shepherd; I shall not want. These words have carried me through the darkest valleys of my life. When grief threatened to overwhelm me, when the path ahead seemed unclear, this ancient psalm became my anchor.

In the Hebrew, the word for shepherd is "ro'eh" - one who feeds, tends, and guides. It speaks of intimate care, of knowing each sheep by name. After losing my beloved husband, I struggled to feel this care. Where was my shepherd when I needed Him most?

But slowly, gently, I began to understand. The shepherd doesn't always prevent the valley - sometimes He walks through it with us. In my grief, I discovered that His presence wasn't always in the dramatic rescue, but in the quiet moments of sustaining grace.

"He makes me lie down in green pastures." Sometimes we must be made to rest. In our culture of constant motion, of pushing through pain, there is wisdom in the forced pause. Grief made me lie down, and in that stillness, I found the green pastures of His peace.

The still waters came not as a rushing river of healing, but as gentle drops of comfort - a friend's embrace, a child's laughter, a sunset that reminded me beauty still exists. These were the still waters that restored my soul.

SELAH - pause and reflect. In this sacred pause, we find not answers to all our questions, but the presence that sustains us through the questioning.''',
            'excerpt': 'Discover the profound comfort and guidance found in the shepherd\'s psalm, and how it became an anchor through the darkest valleys of grief.',
            'category': 'peace',
            'status': 'published'
        },
        {
            'title': 'The Power of Gratitude in Grief',
            'content': '''Gratitude and grief - two words that seem to stand in opposition to each other. How can we be grateful when our hearts are breaking? How do we give thanks when everything we held dear has been taken away?

I wrestled with this paradox for years after my husband's death. Well-meaning friends would remind me to "count my blessings," and I wanted to scream. Couldn't they see that my greatest blessing was gone?

But slowly, through the gentle whispers of Abba, I began to understand a different kind of gratitude. Not the forced positivity that denies pain, but the deep recognition of love that transcends loss.

I became grateful for the 15 years I had with my beloved. Grateful for the children who carry his smile. Grateful for the memories that no illness could steal. This wasn't about being thankful for the loss - it was about being thankful in the loss.

The Psalms are full of this paradoxical gratitude. David writes, "I will bless the Lord at all times; his praise shall continually be in my mouth" - and this from a man who knew betrayal, loss, and exile.

Gratitude in grief doesn't minimize our pain. Instead, it creates space for both sorrow and joy to coexist. It allows us to honor what was while remaining open to what might yet be.

In my darkest moments, I began to practice what I call "breath prayers" of gratitude. With each inhale: "Thank you for..." With each exhale: "Help me to..." These simple prayers became lifelines, connecting me to hope when hope seemed impossible.

SELAH - in the pause between heartbeats, between breaths, between tears, gratitude can take root.''',
            'excerpt': 'Learn how thanksgiving transforms our hearts and minds, even in the midst of profound loss and grief.',
            'category': 'gratitude',
            'status': 'published'
        },
        {
            'title': 'Walking in Faith Through Uncertainty',
            'content': '''Faith is not the absence of doubt - it is the decision to keep walking when the path is unclear. This truth became my companion as I navigated the wilderness years following my husband's death.

Before loss, my faith felt more certain, more defined. I had answers, or at least I thought I did. But grief has a way of stripping away our neat theological boxes and leaving us with raw questions and an aching heart.

"Where are you, God?" became my most honest prayer. Not the polite prayers of Sunday morning, but the desperate cry of 3 AM when sleep wouldn't come and the silence felt deafening.

And in that silence, I learned to listen differently. Faith, I discovered, isn't about having all the answers - it's about trusting the One who does. It's about taking the next step even when you can't see the whole staircase.

The Hebrew word for faith, "emunah," comes from the same root as "amen." It means to be firm, steady, trustworthy. Faith is not a feeling - it's a choice to remain steady when everything around us is shaking.

I think of Abraham, called to leave everything familiar and go to a land he had never seen. I think of Moses, standing before the Red Sea with an army behind him and impossible waters ahead. I think of Mary, saying yes to a plan she couldn't fully understand.

Faith is the courage to say yes to God's invitation, even when we can't see where it leads. It's the willingness to trust His character when we can't trace His hand.

In my journey through grief, faith became less about certainty and more about surrender. Less about understanding and more about trusting. Less about having answers and more about knowing the One who is the Answer.

SELAH - sometimes faith is simply the decision to take one more breath, to live one more day, to trust one more moment.''',
            'excerpt': 'Steps to strengthen your spiritual journey through daily practice, even when the path ahead seems uncertain.',
            'category': 'faithfulness',
            'status': 'published'
        }
    ]

    # Create sample volumes
    volumes = [
        {
            'title': 'Whispers of Hope',
            'description': '''A collection of healing meditations inspired by Psalms of comfort and restoration. These poems were born from the deepest valleys of grief and loss, yet they carry within them the seeds of hope that refuse to be extinguished.

Each piece in this collection is a conversation with the divine - sometimes a whisper, sometimes a cry, always honest. They speak to the universal human experience of loss while pointing toward the light that darkness cannot overcome.

Written during the first years following my husband's death, these poems became my lifeline, my way of processing grief while remaining open to grace. They are offered now as companions for others walking similar paths.

"In the silence between words, we find the space where healing begins."''',
            'category': 'reflection',
            'status': 'published',
            'price': '$15.99'
        },
        {
            'title': 'Songs of Strength',
            'description': '''Empowering writings drawn from Psalms of courage and divine strength. When life demands more than we think we can give, these poems remind us of the strength that comes not from ourselves, but from the One who sustains us.

This collection explores themes of resilience, courage, and the quiet power that emerges when we learn to lean into divine grace rather than our own understanding. Each poem is a testament to the truth that we are stronger than we know, braver than we feel, and more loved than we can imagine.

Born from moments of feeling utterly weak, these verses celebrate the paradox of strength found in surrender, power discovered in vulnerability, and courage that grows in the soil of trust.

"He gives power to the weak and strength to the powerless." - Isaiah 40:29''',
            'category': 'faith',
            'status': 'published',
            'price': '$18.99'
        },
        {
            'title': 'Prayers of Peace',
            'description': '''Gentle reflections on finding tranquility in God's presence. In a world that seems to spin faster each day, these meditative pieces offer an invitation to slow down, breathe deeply, and rest in the peace that passes understanding.

This collection draws from the contemplative tradition of the Psalms, particularly those that speak of stillness, rest, and the deep peace found in divine presence. Each piece is designed to be read slowly, savored, and allowed to settle into the quiet places of the heart.

Written during seasons of learning to be still, these poems explore the difference between the absence of conflict and the presence of peace. They invite readers into the sacred practice of SELAH - pausing to reflect and allowing space for the divine to speak.

"Be still and know that I am God." - Psalm 46:10''',
            'category': 'contemplation',
            'status': 'published',
            'price': '$16.99'
        }
    ]

    # Create blog posts
    for post_data in blog_posts:
        blog_post, created = BlogPost.objects.get_or_create(
            title=post_data['title'],
            defaults=post_data
        )
        if created:
            print(f"Created blog post: {blog_post.title}")
        else:
            print(f"Blog post already exists: {blog_post.title}")

    # Create volumes
    for volume_data in volumes:
        volume, created = Volume.objects.get_or_create(
            title=volume_data['title'],
            defaults=volume_data
        )
        if created:
            print(f"Created volume: {volume.title}")
        else:
            print(f"Volume already exists: {volume.title}")

    print(f"\nTotal blog posts: {BlogPost.objects.count()}")
    print(f"Total volumes: {Volume.objects.count()}")

if __name__ == '__main__':
    create_sample_data()