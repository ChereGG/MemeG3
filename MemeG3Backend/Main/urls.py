from django.conf.urls.static import static
from django.urls import path

from Main import views
from MemeG3 import settings

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api/posts', views.feed_posts),
    path('api/post', views.add_post),
    path('api/users/<int:userID>', views.get_user_by_id),
    path('api/users', views.add_user),
    path('api/profile-posts', views.profile_posts),
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/users/<str:name>', views.search_users),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
