from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Instructor,Course,Student
import json
from django.contrib.auth import login, authenticate
import jwt  # Import JWT library
# from rest_framework_jwt.settings import api_settings

# jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
# jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

@csrf_exempt
def register(request):
    if request.method == 'DELETE':
        User.objects.all().delete()
        return JsonResponse({'message': 'All users deleted successfully'})
    else:
        return JsonResponse({'message': 'Invalid request'}, status=400)

@csrf_exempt
def create_student(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from the request body
            data = json.loads(request.body.decode('utf-8'))

            # Extract data from the JSON object
            username = data.get('name')
            password = data.get('password')
            email = data.get('email')
            name = data.get('name')
            gender = data.get('gender')
            date_of_birth = data.get('date_of_birth')
            major = data.get('major')
            contact_number = data.get('contact_number')

            # Check if a user with the same email already exists
            if User.objects.filter(email=email).exists():
                return JsonResponse({'message': 'User with the same email already exists'}, status=400)

            # Create a new user
            user = User.objects.create_user(username=username, password=password, email=email)

            # Log in the user
            login(request, user)

            # Calculate the next available student_id
            last_student = Student.objects.order_by('-student_id').first()
            if last_student:
                last_student_id = int(last_student.student_id)
                new_student_id = str(last_student_id + 1).zfill(4)
            else:
                # If no students exist yet, start with 1000
                new_student_id = '1000'

            # Create a new student profile linked to the user
            student = Student(user=user, name=name, gender=gender, date_of_birth=date_of_birth, major=major,
                              email=email, contact_number=contact_number, student_id=new_student_id)
            student.save()

            return JsonResponse({'message': 'User registered successfully'})

        except json.JSONDecodeError as e:
            return JsonResponse({'message': 'Invalid JSON data'}, status=400)

    return JsonResponse({'message': 'Invalid request'}, status=400)

@csrf_exempt
def list_instructors(request):
    if request.method == 'GET':
        instructors = Instructor.objects.all()
        instructor_list = []
        for instructor in instructors:
            instructor_data = {
                'id': instructor.id,
                'name': instructor.name,
                'gender': instructor.gender,
                'date_of_birth': instructor.date_of_birth.strftime('%Y-%m-%d'),
                'department': instructor.department,
                'email': instructor.email,
                'contact_number': instructor.contact_number,
            }
            instructor_list.append(instructor_data)
        return JsonResponse(instructor_list, safe=False)
    elif request.method == 'POST':
        print('hey world')
        data = json.loads(request.body)
        InstructorData = {
            'name': data.get('name'),
            'gender': data.get('gender'),
            'date_of_birth': data.get('date_of_birth'),
            'department': data.get('department'),
            'email': data.get('email'),
            'contact_number': data.get('contact_number'),
        }
        instructor = Instructor(**InstructorData)
        instructor.save()
        return JsonResponse({'message': 'Instructor created successfully'}, status=201)

@csrf_exempt
def instructor_detail(request, pk):
    try:
        instructor = Instructor.objects.get(pk=pk)
    except Instructor.DoesNotExist:
        return JsonResponse({'error': 'Instructor not found'}, status=404)

    if request.method == 'GET':
        instructor_data = {
            'id': instructor.id,
            'name': instructor.name,
            'gender': instructor.gender,
            'date_of_birth': instructor.date_of_birth.strftime('%Y-%m-%d'),
            'department': instructor.department,
            'email': instructor.email,
            'contact_number': instructor.contact_number,
        }
        return JsonResponse(instructor_data)
    elif request.method == 'PUT':
        data=json.loads(request.body)
        instructor.name = data.get('name')
        instructor.gender = data.get('gender')
        instructor.date_of_birth = data.get('date_of_birth')
        instructor.department = data.get('department')
        instructor.email = data.get('email')
        instructor.contact_number = data.get('contact_number')
        instructor.save()
        return JsonResponse({'message': 'Instructor updated successfully'})
    elif request.method == 'DELETE':
        instructor.delete()
        return JsonResponse({'message': 'Instructor deleted successfully'}, status=204)


@csrf_exempt
def list_students(request):
    students = Student.objects.all()
    student_data = []

    for student in students:
        print(student.user.password)
        student_data.append({
            'name': student.name,
            'gender': student.gender,
            'date_of_birth': student.date_of_birth,
            'major': student.major,
            'contact_number': student.contact_number,
        })

    return JsonResponse({'students_data': student_data})

# myapp/views.py
@csrf_exempt
def custom_login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            email = data.get('email')
            password = data.get('password')
        except ValueError:
            return JsonResponse({'error': 'Invalid data'}, status=400)

        # Find the user by email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            user = None

        if user is not None:
            # Authenticate the user with the provided email and password
            user = authenticate(request, username=user.username, password=password)
            if user is not None:
                # If authentication is successful, generate a JWT token
                payload = {
                    'user_id': user.id,
                    'username': user.username,
                }
                jwt_token = jwt.encode(payload, 'your-secret-key', algorithm='HS256')  # Replace 'your-secret-key'

                # Log in the user
                login(request, user)

                # Convert the bytes JWT token to a string
                jwt_token_str = jwt_token.decode('utf-8')

                return JsonResponse({'token': jwt_token_str})
        
        return JsonResponse({'error': 'Invalid credentials'}, status=401)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

# Course views
@csrf_exempt
def create_course(request):
     if request.method == 'GET':
        courses = Course.objects.all()
        course_list = []
        for course in courses:
            course_data = {
                'id': course.id,
                'course_code': course.course_code,
                'course_name': course.course_name,
                'department': course.department,
                'credits': course.credits,
                'description': course.description
            }
            course_list.append(course_data)
        return JsonResponse(course_list, safe=False)
     elif request.method == 'POST':
        data = json.loads(request.body)
        course_code = data.get('course_code')
        course_name = data.get('course_name')
        department = data.get('department')
        credits = int(data.get('credits'))
        description = data.get('description')
        
        # Create a new course instance and save it to the database
        new_course = Course(
            course_code=course_code,
            course_name=course_name,
            department=department,
            credits=credits,
            description=description
        )
        new_course.save()
        
        return JsonResponse({'message': 'Course created successfully'}, status=201)
    
     return JsonResponse({'error': 'Invalid request'}, status=400)

@csrf_exempt
def course_detail(request, pk):
    try:
        course = Course.objects.get(pk=pk)
    except Course.DoesNotExist:
        return JsonResponse({'error': 'Course not found'}, status=404)

    if request.method == 'GET':
        course_data = {
            'id': course.id,
            'course_code': course.course_code,
            'course_name': course.course_name,
            'department': course.department,
            'credits': course.credits,
            'description': course.description
        }
        return JsonResponse(course_data)
    elif request.method == 'PUT':
        data = json.loads(request.body)
        print(data)
        course.course_code = data['course_code']
        course.course_name = data['course_name']
        course.department = data['department']
        course.credits = data['credits']
        course.description = data['description']
        course.save()
        return JsonResponse({'message': 'Course updated successfully'})
    elif request.method == 'DELETE':
        course.delete()
        return JsonResponse({'message': 'Course deleted successfully'}, status=204)


# Assignment views
@csrf_exempt
def create_assignment(request):
    return HttpResponse('create_assignment')

@csrf_exempt
def list_assignments(request):
    return HttpResponse('list_assignments')

# Enrollment views
@csrf_exempt
def create_enrollment(request):
    return HttpResponse('create_enrollment')

@csrf_exempt
def list_enrollments(request):
    return HttpResponse('list_enrollments')

# Submission views
@csrf_exempt
def create_submission(request):
    return HttpResponse('create_submission')

@csrf_exempt
def list_submissions(request):
    return HttpResponse('list_submissions')

# Department views
@csrf_exempt
def create_department(request):
    return HttpResponse('create_department')

@csrf_exempt
def list_departments(request):
    return HttpResponse('list_departments')

# Announcement views
@csrf_exempt
def create_announcement(request):
    return HttpResponse('create_announcement')

@csrf_exempt
def list_announcements(request):
    return HttpResponse('list_announcements')


@csrf_exempt
def register_student(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        name = data.get('name')
        gender = data.get('gender')
        date_of_birth = data.get('date_of_birth')
        major = data.get('major')
        email = data.get('email')
        contact_number = data.get('contact_number')

        # Create a new user account
        user = User.objects.create_user(username=username, password=password)

        # Create a new student record
        student = Student(
            user=user,
            name=name,
            gender=gender,
            date_of_birth=date_of_birth,
            major=major,
            email=email,
            contact_number=contact_number
        )
        student.save()

        return JsonResponse({'message': 'Registration successful'})
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)
