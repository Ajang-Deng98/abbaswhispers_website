from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

router = DefaultRouter()
router.register(r'blog', views.BlogPostViewSet)
router.register(r'volumes', views.VolumeViewSet)
router.register(r'prayers', views.PrayerRequestViewSet)
router.register(r'contact', views.ContactMessageViewSet)
router.register(r'subscribers', views.SubscriberViewSet)
router.register(r'comments', views.CommentViewSet)
router.register(r'testimonials', views.TestimonialViewSet)
router.register(r'prayer-testimonials', views.PrayerTestimonialViewSet)

urlpatterns = [
    # Specific URLs first (before router patterns)
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('health/', views.health_check, name='health_check'),
    path('subscribers/subscribe/', views.subscribe_newsletter, name='subscribe_newsletter'),
    path('blog/<int:pk>/comments/', views.get_post_comments, name='post_comments'),
    path('comments/create/', views.create_comment, name='create_comment'),
    path('volumes/<int:pk>/download/', views.track_download, name='track_download'),
    path('debug/posts/', views.debug_posts, name='debug_posts'),
    # Router patterns last
    path('', include(router.urls)),
]