from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import BlogPost, Volume, PrayerRequest, ContactMessage, Subscriber, Comment, SiteSetting, Testimonial, PrayerTestimonial
from .serializers import (
    BlogPostSerializer, VolumeSerializer, PrayerRequestSerializer,
    ContactMessageSerializer, SubscriberSerializer, CommentSerializer, SiteSettingSerializer,
    TestimonialSerializer, PrayerTestimonialSerializer
)

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.filter(status='published').order_by('-created_at')
    serializer_class = BlogPostSerializer
    permission_classes = [AllowAny]
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated()]
        return [AllowAny()]
    
    def list(self, request, *args, **kwargs):
        print(f"BlogPost API called - Found {self.get_queryset().count()} posts")
        return super().list(request, *args, **kwargs)

class VolumeViewSet(viewsets.ModelViewSet):
    queryset = Volume.objects.filter(status='published').order_by('-created_at')
    serializer_class = VolumeSerializer
    permission_classes = [AllowAny]
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated()]
        return [AllowAny()]
    
    def list(self, request, *args, **kwargs):
        print(f"Volume API called - Found {self.get_queryset().count()} volumes")
        return super().list(request, *args, **kwargs)

class PrayerRequestViewSet(viewsets.ModelViewSet):
    queryset = PrayerRequest.objects.all()
    serializer_class = PrayerRequestSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

class SubscriberViewSet(viewsets.ModelViewSet):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]
    
    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if email already exists
        if Subscriber.objects.filter(email=email).exists():
            return Response({'message': 'You are already subscribed!'}, status=status.HTTP_200_OK)
        
        return super().create(request, *args, **kwargs)

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]
    
    def create(self, request, *args, **kwargs):
        # Ensure required fields are present
        required_fields = ['post', 'author_name', 'content']
        for field in required_fields:
            if field not in request.data or not request.data[field]:
                return Response(
                    {'error': f'{field} is required'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        # Validate that the blog post exists
        try:
            BlogPost.objects.get(id=request.data['post'])
        except BlogPost.DoesNotExist:
            return Response(
                {'error': 'Blog post not found'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        response = super().create(request, *args, **kwargs)
        if response.status_code == 201:
            return Response({
                'message': 'We have successfully received your reflection. Thank you for sharing your thoughts with our community.',
                'data': response.data
            }, status=status.HTTP_201_CREATED)
        return response

class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.filter(status='published').order_by('order', '-created_at')
    serializer_class = TestimonialSerializer
    permission_classes = [AllowAny]
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated()]
        return [AllowAny()]

class PrayerTestimonialViewSet(viewsets.ModelViewSet):
    queryset = PrayerTestimonial.objects.filter(status='published').order_by('order', '-created_at')
    serializer_class = PrayerTestimonialSerializer
    permission_classes = [AllowAny]
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated()]
        return [AllowAny()]



@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    return Response({'status': 'OK', 'message': 'Django API is running'})

@api_view(['GET'])
@permission_classes([AllowAny])
def debug_posts(request):
    all_posts = BlogPost.objects.all().values('id', 'title', 'status', 'category')
    published_posts = BlogPost.objects.filter(status='published').values('id', 'title', 'status', 'category')
    return Response({
        'all_posts': list(all_posts),
        'published_posts': list(published_posts),
        'total_count': BlogPost.objects.count(),
        'published_count': BlogPost.objects.filter(status='published').count()
    })

@api_view(['POST'])
@permission_classes([AllowAny])
@method_decorator(ratelimit(key='ip', rate='5/m', method='POST'))
def subscribe_newsletter(request):
    serializer = SubscriberSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Successfully subscribed!'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_post_comments(request, pk):
    try:
        comments = Comment.objects.filter(post_id=pk, status='approved')
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
@permission_classes([AllowAny])
def track_download(request, pk):
    try:
        volume = Volume.objects.get(pk=pk)
        volume.downloads += 1
        volume.save()
        return Response({'message': 'Download tracked', 'downloads': volume.downloads})
    except Volume.DoesNotExist:
        return Response({'error': 'Volume not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([AllowAny])
def create_comment(request):
    """Debug endpoint for comment creation"""
    print(f"Comment data received: {request.data}")
    
    # Check required fields
    required_fields = ['post', 'author_name', 'content']
    missing_fields = [field for field in required_fields if not request.data.get(field)]
    
    if missing_fields:
        return Response(
            {'error': f'Missing required fields: {missing_fields}'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Validate blog post exists
    try:
        post = BlogPost.objects.get(id=request.data['post'])
    except BlogPost.DoesNotExist:
        return Response(
            {'error': 'Blog post not found'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        comment = serializer.save()
        return Response({
            'message': 'We have successfully received your reflection. Thank you for sharing your thoughts with our community.',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)