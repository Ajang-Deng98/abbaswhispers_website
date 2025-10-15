from django.db import models
from django.contrib.auth.models import User

class BlogPost(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    ]
    
    CATEGORY_CHOICES = [
        ('peace', 'Peace'),
        ('gratitude', 'Gratitude'),
        ('strength', 'Strength'),
        ('worship', 'Worship'),
        ('faithfulness', 'Faithfulness'),
        ('guidance', 'Guidance'),
    ]
    
    title = models.CharField(max_length=255)
    content = models.TextField()
    excerpt = models.TextField(blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    tags = models.TextField(blank=True)
    image = models.ImageField(upload_to='blog_images/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    views = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Blog Post'
        verbose_name_plural = 'Blog Posts'
    
    def __str__(self):
        return self.title

class Volume(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    ]
    
    CATEGORY_CHOICES = [
        ('thanksgiving', 'Thanksgiving'),
        ('wonder', 'Wonder'),
        ('faith', 'Faith'),
        ('contemplation', 'Contemplation'),
        ('reflection', 'Reflection'),
    ]
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    excerpt = models.TextField(blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    price = models.CharField(max_length=20)
    image = models.ImageField(upload_to='volume_images/', blank=True, null=True)
    audio_file = models.FileField(upload_to='volume_audio/', blank=True, null=True, help_text="Upload audio file (MP3, WAV, etc.)")
    download_link = models.URLField(blank=True)
    content = models.TextField(blank=True)
    downloads = models.IntegerField(default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='published')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title

class PrayerRequest(models.Model):
    CATEGORY_CHOICES = [
        ('healing', 'Healing'),
        ('family', 'Family'),
        ('financial', 'Financial'),
        ('guidance', 'Guidance'),
        ('salvation', 'Salvation'),
        ('grief', 'Grief'),
        ('thanksgiving', 'Thanksgiving'),
        ('other', 'Other'),
    ]
    
    STATUS_CHOICES = [
        ('new', 'New'),
        ('praying', 'Praying'),
        ('prayed', 'Prayed'),
        ('answered', 'Answered'),
    ]
    
    name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    request = models.TextField()
    is_anonymous = models.BooleanField(default=False)
    allow_sharing = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Prayer from {self.name or 'Anonymous'} - {self.category}"

class ContactMessage(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('read', 'Read'),
        ('replied', 'Replied'),
        ('archived', 'Archived'),
    ]
    
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

class Subscriber(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('unsubscribed', 'Unsubscribed'),
        ('bounced', 'Bounced'),
    ]
    
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    subscribed_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Comment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    
    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='comments')
    author_name = models.CharField(max_length=100)
    author_email = models.EmailField(blank=True)
    content = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

class Testimonial(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    ]
    
    author_name = models.CharField(max_length=100)
    author_role = models.CharField(max_length=100, blank=True)
    quote = models.TextField()
    image = models.ImageField(upload_to='testimonial_images/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='published')
    order = models.IntegerField(default=0, help_text="Order of display (lower numbers first)")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'Testimonial'
        verbose_name_plural = 'Testimonials'
    
    def __str__(self):
        return f"{self.author_name} - {self.quote[:50]}..."

class PrayerTestimonial(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    ]
    
    CATEGORY_CHOICES = [
        ('healing', 'Healing'),
        ('family', 'Family'),
        ('financial', 'Financial'),
        ('guidance', 'Guidance'),
        ('salvation', 'Salvation'),
        ('grief', 'Grief'),
        ('thanksgiving', 'Thanksgiving'),
        ('other', 'Other'),
    ]
    
    author_name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    testimony = models.TextField()
    prayer_request = models.ForeignKey(PrayerRequest, on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='published')
    order = models.IntegerField(default=0, help_text="Order of display (lower numbers first)")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'Prayer Testimonial'
        verbose_name_plural = 'Prayer Testimonials'
    
    def __str__(self):
        return f"{self.author_name} - {self.category} - {self.testimony[:50]}..."

class Book(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    ]
    
    CATEGORY_CHOICES = [
        ('devotional', 'Devotional'),
        ('poetry', 'Poetry'),
        ('memoir', 'Memoir'),
        ('study', 'Bible Study'),
        ('inspiration', 'Inspiration'),
    ]
    
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True)
    description = models.TextField()
    excerpt = models.TextField(blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    author = models.CharField(max_length=100, default='Uzo')
    isbn = models.CharField(max_length=20, blank=True)
    pages = models.IntegerField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    cover_image = models.ImageField(upload_to='book_covers/', blank=True, null=True)
    preview_pdf = models.FileField(upload_to='book_previews/', blank=True, null=True, help_text="Upload preview PDF")
    purchase_link = models.URLField(blank=True, help_text="Link to purchase (Amazon, etc.)")
    publication_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='published')
    featured = models.BooleanField(default=False)
    sales_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-featured', '-created_at']
        verbose_name = 'Book'
        verbose_name_plural = 'Books'
    
    def __str__(self):
        return self.title

class SiteSetting(models.Model):
    setting_key = models.CharField(max_length=100, unique=True)
    setting_value = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)