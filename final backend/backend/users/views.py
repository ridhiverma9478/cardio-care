import json
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.views.decorators.http import require_http_methods

from .models import CustomUser

from .utils import jwt_encode, jwt_decode, auth_user

from django.forms.models import model_to_dict


# =============================== #
# ========== User API's ========== #
# =============================== #
@csrf_exempt
def user_register(request):
    if request.method != 'POST':
        return JsonResponse(
            {'status': 'failed', 'message': 'Invalid request method. Use POST.'},
            status=405
        )

    try:
        data = json.loads(request.body)
        required_fields = ['email']
        missing_fields = [field for field in required_fields if not data.get(field)]

        if missing_fields:
            return JsonResponse(
                {'status': 'failed', 'message': f'Missing mandatory fields: {", ".join(missing_fields)}.'},
                status=400
            )

        email = data.get('email').strip()
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        phone_number = data.get('phone_number')
        password = data.get('password')

        if CustomUser.objects.filter(email=email).exists():
            return JsonResponse(
                {'status': 'failed', 'message': 'User already exists!'},
                status=409
            )

        username = email.split('@')[0]

        hashed_password = make_password(password)
        encoded_token = jwt_encode(email)
        CustomUser.objects.create(email=email, password=hashed_password, first_name=first_name,
                            last_name=last_name, username=username, phone_number=phone_number,
                            profile_picture='profile_pictures/default_male_image.png')

        return JsonResponse(
            {'status': 'success',
             'message': 'User registered successfully',
             'token': str(encoded_token)},
            status=201
        )
    except json.JSONDecodeError:
        return JsonResponse(
            {'status': 'failed', 'message': 'Invalid JSON in request body.'},
            status=400
        )
    except Exception as e:
        return JsonResponse(
            {'status': 'failed', 'message': f'Error: {str(e)}'},
            status=500
        )
    
@csrf_exempt
def user_login(request):
    if request.method != 'POST':
        return JsonResponse(
            {'status': 'failed', 'message': 'Invalid request method. Use POST.'},
            status=405
        )

    try:
        data = json.loads(request.body)

        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return JsonResponse(
                {'status': 'failed', 'message': 'Missing email or password.'},
                status=400
            )

        email = email.strip()
        password = password.strip()

        user = authenticate(request, username=email, password=password)

        if user is not None:
                login(request, user)
                token = jwt_encode(email)
                return JsonResponse(
                    {'status': 'success', 'message': 'Login successful.', 'token': str(token)},
                    status=200
                )
        else:
            return JsonResponse(
                {'status': 'failed', 'message': 'Invalid login credentials.'},
                status=401
            )

    except json.JSONDecodeError:
        return JsonResponse(
            {'status': 'failed', 'message': 'Invalid JSON in request body.'},
            status=400
        )
    except Exception as e:
        return JsonResponse(
            {'status': 'failed', 'message': f'Error: {str(e)}'},
            status=500
        )
    
@csrf_exempt
@require_http_methods(["GET"])
def get_user_details_view(request):
    bearer = request.headers.get('Authorization')
    if not bearer:
        return JsonResponse({'success': False, 'message': 'Authentication header is required.'}, status=401)

    token = bearer.split()[1]
    if not auth_user(token):
        return JsonResponse({'success': False, 'message': 'Invalid token data.'}, status=401)

    decoded_token = jwt_decode(token)
    user_email = decoded_token.get('email')

    try:
        user = CustomUser.objects.get(email=user_email)
    except CustomUser.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'User not found.'}, status=404)

    user_details = model_to_dict(user, exclude=['password'])
    user_details['profile_picture'] = str(user.profile_picture)

    return JsonResponse({"success": True, "message": "User details fetched successfully.", "user_details": user_details}, status=200)

    
@csrf_exempt
@require_http_methods(["POST"])
def edit_user_details_view(request):
    bearer = request.headers.get('Authorization')
    if not bearer:
        return JsonResponse({'success': False, 'message': 'Authentication header is required.'}, status=401)

    token = bearer.split()[1]
    if not auth_user(token):
        return JsonResponse({'success': False, 'message': 'Invalid token data.'}, status=401)

    decoded_token = jwt_decode(token)
    user_email = decoded_token.get('email')

    try:
        user = CustomUser.objects.get(email=user_email)
    except CustomUser.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'User not found.'}, status=404)

    data = request.POST
    if data.get('first_name'):
        user.first_name = data.get('first_name')
    if data.get('last_name'):
        user.last_name = data.get('last_name')
    if data.get('username'):
        user.username = data.get('username')
    if data.get('phone_number'):
        user.phone_number = data.get('phone_number')

    user.save()

    user_details = model_to_dict(user, exclude=['password'])
    user_details['profile_picture'] = str(user.profile_picture)

    return JsonResponse({"success": True, "message": "User details edited successfully.", "user_details": user_details}, status=200)


@csrf_exempt
@require_http_methods(["POST"])
def edit_profile_picture_view(request):
    bearer = request.headers.get('Authorization')
    if not bearer:
        return JsonResponse({'success': False, 'message': 'Authentication header is required.'}, status=401)

    token = bearer.split()[1]
    if not auth_user(token):
        return JsonResponse({'success': False, 'message': 'Invalid token data.'}, status=401)

    decoded_token = jwt_decode(token)
    user_email = decoded_token.get('email')

    uploaded_image = request.FILES.get('profile_picture')

    try:
        user = CustomUser.objects.get(email=user_email)
    except CustomUser.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'User not found.'}, status=404)

    if not uploaded_image:
        return JsonResponse({'success': False, 'message': 'No profile picture uploaded.'}, status=400)

    try:
        user.profile_picture.save(uploaded_image.name, uploaded_image)
        user.save()
        user_details = model_to_dict(user, exclude=['password'])
        user_details['profile_picture'] = str(user.profile_picture)
        return JsonResponse({"success": True, "message": "Profile picture edited successfully.", "user_details": user_details}, status=200)
    except Exception as e:
        return JsonResponse({'success': False, 'message': f'Error saving profile picture: {str(e)}'}, status=500)

