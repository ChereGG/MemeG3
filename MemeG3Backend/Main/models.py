from django.db import models

# Create your models here.
class Meme(models.Model):
    image = models.ImageField()
    title = models.CharField(max_length=150, default="")
    description = models.CharField(max_length=400, default="")
