from rest_framework import serializers
from django.contrib.auth.models import User
from .models import BlogPost, Volume, PrayerRequest, ContactMessage, Subscriber, Comment, SiteSetting, Testimonial, PrayerTestimonial, Book

class BlogPostSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    
    class Meta:
        model = BlogPost
        fields = '__all__'

class VolumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volume
        fields = '__all__'

class PrayerRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrayerRequest
        fields = '__all__'

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
    
    def validate(self, data):
        if not data.get('author_name'):
            raise serializers.ValidationError({'author_name': 'Name is required'})
        if not data.get('content'):
            raise serializers.ValidationError({'content': 'Comment content is required'})
        if not data.get('post'):
            raise serializers.ValidationError({'post': 'Blog post ID is required'})
        return data

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'

class PrayerTestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrayerTestimonial
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class SiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSetting
        fields = '__all__'