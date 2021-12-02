from django.http import JsonResponse
from django.http.response import Http404, HttpResponse
from django.shortcuts import render
from django.contrib.auth.hashers import make_password,check_password
from django.contrib.auth.tokens import default_token_generator
from rest_framework import status
from datetime import datetime

from rest_framework.decorators import api_view, authentication_classes, parser_classes, permission_classes
from rest_framework.parsers import JSONParser, MultiPartParser

from Main.models import Post, CustomUser
from Main.serializers import *


@api_view(['GET'])
#@authentication_classes([TokenAuthentication, ])
#@permission_classes([IsAuthenticated, ])
def feed_posts(request):
    if request.method == 'GET':
       # if not request.user.is_authenticated :
        #    return JsonResponse({'message': 'The user does not exist'}, status=status.HTTP_404_NOT_FOUND)
        posts = Post.objects.all()
        post_serializer = PostSerializerGet(posts, many=True)
        return JsonResponse(post_serializer.data, safe=False)


@api_view(['GET'])
# @authentication_classes([TokenAuthentication, ])
# @permission_classes([IsAuthenticated, ])
def get_user_by_id(request, userID):
    try:
        user = CustomUser.objects.get(pk=userID)
    except CustomUser.DoesNotExist:
        return JsonResponse({'message': 'The user does not exist'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        user_serializer = UserSerializer(user)
        return JsonResponse(user_serializer.data)


@api_view(['POST'])
@parser_classes([MultiPartParser])
def add_post(request):
    data = request.data

    data['user'] = 1
    postSerializer = PostSerializerUpload(data=request.data)
    if postSerializer.is_valid():
        post = postSerializer.save()
        newPost = PostSerializerGet(Post.objects.get(pk=post.id))
        return JsonResponse(newPost.data, status=status.HTTP_200_OK)
    else:
        print(postSerializer.errors)
        return JsonResponse({'message': postSerializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def profile_posts(request):
    if request.method == 'GET':
        data = request.data
        data['user'] = 1
        posts = Post.objects.all().filter(user_id__exact=data['user'])
        print("\n")
        print(posts)
        post_serializer = PostSerializerGet(posts, many=True)
        return JsonResponse(post_serializer.data, safe=False)



@api_view(['POST'])
@parser_classes([JSONParser])
def add_user(request):
    data = request.data
    data['password'] = make_password(data['password'])
    postSerializer = UserSerializerAdd(data=request.data)
    if postSerializer.is_valid():
        post = postSerializer.save()
        return JsonResponse({'message': "ok"}, status=status.HTTP_200_OK)
    else:
        print(postSerializer.errors)
        return JsonResponse({'message': postSerializer.errors}, status=status.HTTP_400_BAD_REQUEST)
