from django import forms
from rest_framework import serializers
from django.contrib.auth.models import User
from Main.models import *


class MemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meme
        fields = (
            "id",
            "image",
            "title",
            "description"
        )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id',
                  'username',
                  'first_name',
                  'last_name',
                  'email')
