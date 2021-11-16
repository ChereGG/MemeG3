from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status

from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import JSONParser, MultiPartParser

from Main.models import Post, CustomUser
from Main.serializers import *


@api_view(['GET'])
# @authentication_classes([TokenAuthentication, ])
# @permission_classes([IsAuthenticated, ])
def feed_posts(request):
    if request.method == 'GET':
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
        return JsonResponse(postSerializer.data, status=status.HTTP_200_OK)
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
