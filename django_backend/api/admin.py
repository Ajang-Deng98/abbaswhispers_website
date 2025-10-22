from django.contrib import admin
from .models import BlogPost, Volume, PrayerRequest, ContactMessage, Subscriber, Comment, SiteSetting, Testimonial, PrayerTestimonial

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'status', 'author', 'created_at']
    list_filter = ['status', 'category', 'created_at']
    search_fields = ['title', 'content']
    list_editable = ['status']
    fields = ['title', 'excerpt', 'content', 'category', 'tags', 'image', 'status', 'author']
    readonly_fields = ['created_at', 'updated_at']
    
    def save_model(self, request, obj, form, change):
        if not obj.author:
            obj.author = request.user
        super().save_model(request, obj, form, change)

@admin.register(Volume)
class VolumeAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'price', 'status', 'created_at']
    list_filter = ['status', 'category', 'created_at']
    search_fields = ['title', 'description']
    list_editable = ['status']
    fields = ['title', 'excerpt', 'description', 'content', 'category', 'price', 'image', 'audio_file', 'download_link', 'status']
    readonly_fields = ['downloads', 'created_at', 'updated_at']

@admin.register(PrayerRequest)
class PrayerRequestAdmin(admin.ModelAdmin):
    list_display = ['get_display_name', 'category', 'status', 'is_anonymous', 'created_at']
    list_filter = ['status', 'category', 'is_anonymous', 'created_at']
    search_fields = ['name', 'request', 'email']
    list_editable = ['status']
    readonly_fields = ['created_at', 'updated_at']
    
    def get_display_name(self, obj):
        return obj.name if obj.name else 'Anonymous'
    get_display_name.short_description = 'Name'

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['name', 'email', 'subject']
    list_editable = ['status']

@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ['email', 'name', 'status', 'subscribed_at']
    list_filter = ['status', 'subscribed_at']
    search_fields = ['email', 'name']
    list_editable = ['status']

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['author_name', 'post', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['author_name', 'content']
    list_editable = ['status']



@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['author_name', 'author_role', 'status', 'order', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['author_name', 'quote']
    list_editable = ['status', 'order']
    ordering = ['order', '-created_at']

@admin.register(PrayerTestimonial)
class PrayerTestimonialAdmin(admin.ModelAdmin):
    list_display = ['author_name', 'category', 'status', 'order', 'created_at']
    list_filter = ['status', 'category', 'created_at']
    search_fields = ['author_name', 'testimony']
    list_editable = ['status', 'order']
    ordering = ['order', '-created_at']

@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ['setting_key', 'setting_value', 'updated_at']
    search_fields = ['setting_key']