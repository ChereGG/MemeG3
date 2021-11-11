from django import forms
from rest_framework import serializers
from django.contrib.auth.models import User
from Main.models import *


class PostSerializerGet(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = (
            "id",
            "user",
            "date",
            "image",
            "title",
            "description",
            "no_likes"
        )


class PostSerializerUpload(forms.ModelForm):
    class Meta:
        model = Post
        fields = (
            "id",
            "user",
            "date",
            "image",
            "title",
            "description",
            "no_likes"
        )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserG3
        fields = ('id',
                  'username',
                  'first_name',
                  'last_name',
                  'email',
                  'descriere',
                  'image')
