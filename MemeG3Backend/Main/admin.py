from django.contrib import admin
from Main.models import *

admin.site.register(Post)
admin.site.register(CustomUser)
admin.site.register(PostUserLike)
admin.site.register(Comment)
admin.site.register(UserFollow)

# Register your models here.
