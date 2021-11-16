from django.conf.urls.static import static
from django.urls import path

from Main import views
from MemeG3 import settings

urlpatterns = [
    path('api/posts', views.feed_posts),
    path('api/post', views.add_post),
    path('api/users/<str:userID>', views.get_user_by_id),
    path('api/profile-posts', views.profile_posts)
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
