from django import forms
from rest_framework import serializers
from django.contrib.auth.models import User
from Main.models import *


class PostSerializerGet(serializers.ModelSerializer):
    username = serializers.CharField(source='user.user.username')
    first_name = serializers.CharField(source='user.user.first_name')
    last_name = serializers.CharField(source='user.user.last_name')
    profile_pic = serializers.ImageField(source='user.image')
    class Meta:
        model = Post
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "profile_pic",
            "date",
            "image",
            "title",
            "description",
            "no_likes",
        )


class PostSerializerUpload(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = (
            "id",
            "date",
            "image",
            "title",
            "description",
            "no_likes",
            "user"
        )


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    class Meta:
        model = CustomUser
        fields = ('id',
                  'username',
                  'first_name',
                  'last_name',
                  'descriere',
                  'image')

