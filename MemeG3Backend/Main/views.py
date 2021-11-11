from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status

from rest_framework.decorators import api_view

from Main.models import Post, CustomUser
from Main.serializers import PostSerializerGet, UserSerializer


@api_view(['GET'])
#@authentication_classes([TokenAuthentication, ])
#@permission_classes([IsAuthenticated, ])
def feed_posts(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        post_serializer = PostSerializerGet(posts,many=True)
        return JsonResponse(post_serializer.data,safe=False)

@api_view(['GET'])
#@authentication_classes([TokenAuthentication, ])
#@permission_classes([IsAuthenticated, ])
def get_user_by_id(request,userID):
    try:
        user = CustomUser.objects.get(pk=userID)
    except CustomUser.DoesNotExist:
        return JsonResponse({'message': 'The user does not exist'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        user_serializer = UserSerializer(user)
        return JsonResponse(user_serializer.data)
