from django import forms
from rest_framework import serializers
from django.contrib.auth.models import User
from Main.models import *


class CommentSerializer(serializers.ModelSerializer):
    """
    Serializer used for the comments
    """
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
            "comments",
            "is_liked_by_user",
        )




class PostSerializerUpload(serializers.ModelSerializer):
    """
    Serializer used for uploading a meme
    """
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


class CustomUserSerializerAdd(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('user',
                  'descriere',
                  'image')


class UserSerializerUpload(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ('id',
                  'descriere',
                  'image',
                  'user')

class PostUserLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostUserLike
        fields = ('post',
                  'user')

class UserFollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollow
        fields = ('user1',
                  'user2')
