from django.http import JsonResponse, QueryDict
from rest_framework import status
from rest_framework_simplejwt.backends import TokenBackend
from rest_framework.decorators import api_view, authentication_classes, parser_classes, permission_classes
from rest_framework.parsers import JSONParser, MultiPartParser

from Main.serializers import *


def get_id(request):
    """
    Retrieves the id from a token
    """
    try:
        token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
        valid_data = TokenBackend(
            algorithm='HS256').decode(token, verify=False)
        user_id = valid_data['user_id']
        return user_id
    except Exception as v:
        print("validation error", v)


@api_view(['GET'])
def feed_posts(request):
    """
    Retrieves all the posts posted by the users the current user follows
    """
    user_id = get_id(request)
    user = CustomUser.objects.get(user_id=user_id)
    if request.method == 'GET':
        posts = reversed(Post.objects.all().order_by("date"))
        followed_users = UserFollow.objects.filter(user1_id=user_id)
        posts = []
        posts_copy = []
        for followed_user in followed_users:
            posts.extend(Post.objects.filter(user_id=followed_user.user2_id))
        for post in posts:
            try:
                PostUserLike.objects.get(user=user, post=post)
                post.is_liked_by_user = True
                posts_copy.append(post)
            except Exception:
                post.is_liked_by_user = False
                posts_copy.append(post)

        post_serializer = PostSerializerGet(posts_copy, many=True)
        return JsonResponse(post_serializer.data, safe=False)


@api_view(['GET'])
def get_user_by_id(request, userID):
    """
    Retrieves the user object having a given id
    """
    try:
        user = CustomUser.objects.get(user_id=userID)
    except CustomUser.DoesNotExist:
        return JsonResponse({'message': 'The user does not exist'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        user_serializer = UserSerializer(user)
        return JsonResponse(user_serializer.data)


@api_view(['POST'])
@parser_classes([MultiPartParser])
def add_post(request):
    """
    Adds the post from the request body to the database
    """
    print(".....................")
    data = request.data
    data['user'] = get_id(request)
    postSerializer = PostSerializerUpload(data=request.data)
    if postSerializer.is_valid():
        post = postSerializer.save()
        newPost = PostSerializerGet(Post.objects.get(pk=post.id))
        return JsonResponse(newPost.data, status=status.HTTP_200_OK)
    else:
        print(postSerializer.errors)
        return JsonResponse({'message': postSerializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def add_comment(request):
    """
    Adds the comment object from the request into the database
    """
    data = request.data
    data['userName'] = CustomUser.objects.get(pk=get_id(request)).user.username
    commentSerializer = CommentSerializer(data=data)
    if commentSerializer.is_valid():
        comment = commentSerializer.save()
        newComment = CommentSerializer(Comment.objects.get(pk=comment.id))
        return JsonResponse(newComment.data, status=status.HTTP_200_OK)
    else:
        print(commentSerializer.errors)
        return JsonResponse({'message': commentSerializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def profile_posts(request, user_id):
    """
    Retrieves all the posts posted by the user with the given id
    """
    if request.method == 'GET':
        data = request.data
        user = CustomUser.objects.get(user_id=user_id)
        data['user'] = user_id
        posts = reversed(Post.objects.all().filter(user_id__exact=data['user']).order_by("date"))
        posts_copy = []
        for post in posts:
            try:
                PostUserLike.objects.get(user=user, post=post)
                post.is_liked_by_user = True
                posts_copy.append(post)
            except Exception:
                post.is_liked_by_user = False
                posts_copy.append(post)

        post_serializer = PostSerializerGet(posts_copy, many=True)
        return JsonResponse(post_serializer.data, safe=False)


@api_view(['POST'])
# @parser_classes([JSONParser])
@parser_classes([MultiPartParser])
@permission_classes([])
def add_user(request):
    """
    Registers a new user. No token is necessary to call this endpoint
    """
    print(request.data)
    user = User.objects.create_user(
        username=request.data.get('username'),
        password=request.data.get('password'),
        last_name=request.data.get('last_name'),
        first_name=request.data.get('first_name'),
        email=request.data.get('email')
    )
    customUserSerializer = CustomUserSerializerAdd(data={
        'user': user.id,
        'descriere': request.data.get('descriere'),
        'image': request.data.get('image')
    })
    if customUserSerializer.is_valid():
        customUser = customUserSerializer.save()
        return JsonResponse({'message': "ok"}, status=status.HTTP_200_OK)
    else:
        print(customUserSerializer.errors)
        return JsonResponse({'message': customUserSerializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def change_picture(request):
    """
    Updates the current user (from token) with the new profile picture(from request body)
    """
    if request.method == 'PUT':
        id_user = get_id(request)
        user = CustomUser.objects.get(user_id=id_user)
        user_data = QueryDict('', mutable=True)
        user_data['user'] = user.user
        user_data['descriere'] = user.descriere
        serializer_upload = UserSerializerUpload(
            user_data, request.FILES, instance=user)
        if serializer_upload.is_valid():
            serializer_upload.save()
            serializer = UserSerializer(user)
            return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)
        return JsonResponse({'message': 'The image was not uploaded'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def change_description(request):
    """
        Updates the current user (from token) with the new description picture(from request body)
    """
    if request.method == 'PUT':
        id_user = get_id(request)
        user = CustomUser.objects.get(user_id=id_user)
        user.descriere = request.data['descriere']
        user.save()
        return JsonResponse({'message': 'Foarte bine'}, status=status.HTTP_200_OK)


@api_view(['GET'])
# @authentication_classes([TokenAuthentication, ])
# @permission_classes([IsAuthenticated, ])
def search_users(request, name):
    """
       Retrieves all the users from the database whose names match the name parameter
    """
    split_name = name.split(' ')
    if len(split_name) == 1:
        list1 = CustomUser.objects.filter(
            user__first_name__contains=split_name[0]
        )
        list2 = CustomUser.objects.filter(
            user__last_name__contains=split_name[0]
        )
        list3 = CustomUser.objects.filter(
            user__username__contains=split_name[0]
        ) 
        combined_list = list1 | list2 | list3
        userSerializer = UserSerializer(combined_list, many=True)
        return JsonResponse(userSerializer.data, safe=False, status=status.HTTP_200_OK)

    if len(split_name) == 2:
        list1 = CustomUser.objects.filter(user__first_name__contains=split_name[0]).filter(
            user__last_name__contains=split_name[1])
        list2 = CustomUser.objects.filter(user__first_name__contains=split_name[1]).filter(
            user__last_name__contains=split_name[0])
        combined_list = list1 | list2
        userSerializer = UserSerializer(combined_list, many=True)
        return JsonResponse(userSerializer.data, safe=False, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_user_id(request):
    """
       Retrieves the id of the current user (request)
       """
    if request.method == 'GET':
        user_id = get_id(request)
        return JsonResponse({'id': user_id}, status=status.HTTP_200_OK)


@api_view(['PUT'])
# @authentication_classes([TokenAuthentication, ])
# @permission_classes([IsAuthenticated, ])
def like_post(request, postID):
    """
       Updates the post with postID identifier adding a like to its counter
    """
    if (request.method == 'PUT'):
        userID = get_id(request)
        user = CustomUser.objects.get(user_id=userID)
        post = Post.objects.get(id=postID)
        try:
            postUserLike = PostUserLike.objects.get(user=user, post=post)
            # remove like pentru ca acel like pentru post exista
            post.no_likes -= 1
            post.save()
            postUserLike.delete()
            return JsonResponse({'message': 'Disliked'}, status=status.HTTP_200_OK)
        except Exception:  # intra pe exceptie pentru ca likeul nu exista pt postul respectiv, deci se salveaza:
            post.no_likes += 1
            post.save()
            postUserLike = PostUserLike.objects.create(post=post, user=user)
            postUserLike.save()
            return JsonResponse({'message': 'Liked'}, status=status.HTTP_200_OK)


@api_view(['PUT'])
def follow_user(request, followed_user_id):
    """
       Adds a UserFollow object to the database between the current user(token) and the user having
       the 'follow_user_id' identifier
    """
    if request.method == 'PUT':
        user_id = get_id(request)
        follow = UserFollow.objects.create(user1_id=user_id, user2_id=followed_user_id)
        follow.save()
        return JsonResponse({'message': f'User {user_id} followed {followed_user_id}'}, safe=False,
                            status=status.HTTP_201_CREATED)


@api_view(['PUT'])
def unfollow_user(request, unfollowed_user_id):
    """
       Deletes the UserFollow object between the current user(token) and the user having
       the 'follow_user_id' identifier from the database
    """
    if request.method == 'PUT':
        user_id = get_id(request)
        follow = UserFollow.objects.get(user1_id=user_id, user2_id=unfollowed_user_id)
        if follow is not None:
            follow.delete()
            return JsonResponse({'message': f'User {user_id} unfollowed {unfollowed_user_id}'}, safe=False,
                                status=status.HTTP_201_CREATED)
        else:
            return JsonResponse({'message': 'Error on unfollow'}, safe=False, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def is_follow(request, user_id):
    """
    Returns 1 = True if there exists an UserFollow object between the current user(token) and the user having
       the 'follow_user_id' identifier in the database or 0=False otherwise
    """
    if request.method == 'GET':
        my_id = get_id(request)
        try:
            follow = UserFollow.objects.get(user1_id=my_id, user2_id=user_id)
            return JsonResponse({'following': 1}, status=status.HTTP_200_OK)
        except Exception:
            return JsonResponse({'following': 0}, status=status.HTTP_200_OK)
