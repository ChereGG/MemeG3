from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class CustomUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    descriere = models.CharField(max_length=150, default="")
    image = models.ImageField()


class Post(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=False, default=-1)
    date = models.DateField()
    image = models.ImageField(null=False)
    title = models.CharField(max_length=150, default="")
    description = models.CharField(max_length=400, default="")
    no_likes = models.IntegerField(default=0)

class Comment(models.Model):
    postId = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.CharField(max_length=150, default="")
    userName = models.CharField(max_length=150, default="")