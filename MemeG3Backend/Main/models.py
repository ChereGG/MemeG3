from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Meme(models.Model):
    image = models.ImageField()
    title = models.CharField(max_length=150, default="")
    description = models.CharField(max_length=400, default="")

class UserG3(User):#Mosteneste din django.contrib.auth.models User
    descriere = models.CharField(max_length=150 , default="")
    image = models.ImageField()
