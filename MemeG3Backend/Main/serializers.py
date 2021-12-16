from django import forms
from rest_framework import serializers
from django.contrib.auth.models import User
from Main.models import *


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
            model = Comment
            fields = (
                "id",
                "postId",
                "text",
                "userName"
            )

class PostSerializerGet(serializers.ModelSerializer):
    comments = CommentSerializer(source='comment_set', many=True)
    user_id = serializers.IntegerField(source='user.user.id')
    username = serializers.CharField(source='user.user.username')
    first_name = serializers.CharField(source='user.user.first_name')
    last_name = serializers.CharField(source='user.user.last_name')
    profile_pic = serializers.ImageField(source='user.image')

    class Meta:
        model = Post
        fields = (
            "id",
            "user_id",
            "username",
            "first_name",
            "last_name",
            "profile_pic",
            "date",
            "image",
            "title",
            "description",
            "no_likes",
            "comments"
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


class UserSerializerAdd(serializers.ModelSerializer):
    #username = serializers.CharField(source='user.username')
    #password = serializers.CharField(source='user.password')
    class Meta:
        model = User
        fields = ('username',
                  'password')
    def create(self, validated_data):
        return User.objects.create(**validated_data)


class UserSerializerUpload(forms.ModelForm):

    class Meta:
        model = CustomUser
        fields = ('id',
                  'descriere',
                  'image',
                  'user')
