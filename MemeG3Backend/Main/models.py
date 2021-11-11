from django.db import models
from django.contrib.auth.models import User
# Create your models here.



class UserG3(User):#Mosteneste din django.contrib.auth.models User
    descriere = models.CharField(max_length=150 , default="")
    image = models.ImageField()

class Post(models.Model):
    user = models.ForeignKey(UserG3, on_delete=models.CASCADE, null=False, default=-1)
    date = models.DateField()
    image = models.ImageField(null=False)
    title = models.CharField(max_length=150, default="")
    description = models.CharField(max_length=400, default="")
    no_likes = models.IntegerField(default=0)




