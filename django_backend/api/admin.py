from django.contrib import admin
from .models import BlogPost, Volume, PrayerRequest, ContactMessage, Subscriber, Comment, SiteSetting, Testimonial, PrayerTestimonial, Book

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'status', 'author', 'views', 'created_at']
    list_filter = ['status', 'category', 'created_at', 'author']
    search_fields = ['title', 'content', 'excerpt']
    list_editable = ['status']
    readonly_fields = ['views', 'created_at', 'updated_at']
    fieldsets = (
        ('Content', {
            'fields': ('title', 'content', 'excerpt', 'image')
        }),
        ('Categorization', {
            'fields': ('category', 'tags', 'status')
        }),
        ('Metadata', {
            'fields': ('author', 'views', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )

@admin.register(Volume)
class VolumeAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'price', 'status', 'downloads', 'created_at']
    list_filter = ['status', 'category', 'created_at']
    search_fields = ['title', 'description', 'content']
    list_editable = ['status', 'price']
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

@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ['email', 'name', 'status', 'subscribed_at']
    list_filter = ['status', 'subscribed_at']
    search_fields = ['email', 'name']

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['author_name', 'post', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['author_name', 'content']

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['author_name', 'author_role', 'status', 'order', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['author_name', 'quote']
    list_editable = ['status', 'order']
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = (
        ('Testimonial Content', {
            'fields': ('author_name', 'author_role', 'quote', 'image')
        }),
        ('Display Settings', {
            'fields': ('status', 'order')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )

@admin.register(PrayerTestimonial)
class PrayerTestimonialAdmin(admin.ModelAdmin):
    list_display = ['author_name', 'category', 'status', 'order', 'created_at']
    list_filter = ['status', 'category', 'created_at']
    search_fields = ['author_name', 'testimony']
    list_editable = ['status', 'order']
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = (
        ('Testimony Content', {
            'fields': ('author_name', 'category', 'testimony', 'prayer_request')
        }),
        ('Display Settings', {
            'fields': ('status', 'order')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'category', 'price', 'status', 'featured', 'publication_date']
    list_filter = ['status', 'category', 'featured', 'publication_date']
    search_fields = ['title', 'subtitle', 'description', 'author']
    list_editable = ['status', 'featured', 'price']
    readonly_fields = ['sales_count', 'created_at', 'updated_at']
    fieldsets = (
        ('Book Information', {
            'fields': ('title', 'subtitle', 'author', 'description', 'excerpt')
        }),
        ('Publication Details', {
            'fields': ('category', 'isbn', 'pages', 'publication_date')
        }),
        ('Media & Files', {
            'fields': ('cover_image', 'preview_pdf')
        }),
        ('Sales & Marketing', {
            'fields': ('price', 'purchase_link', 'featured')
        }),
        ('Status & Metadata', {
            'fields': ('status', 'sales_count', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )

@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ['setting_key', 'setting_value', 'updated_at']