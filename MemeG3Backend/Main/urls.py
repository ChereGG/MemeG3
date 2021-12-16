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
    path('api/users/<str:user_id>/posts', views.profile_posts),
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/users/<str:name>', views.search_users),
    path('api/change-picture', views.change_picture),
    path('api/change-description', views.change_description),
    path('api/get-user-id', views.get_user_id),
    path('api/posts/<str:postID>/like-post', views.like_post),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
