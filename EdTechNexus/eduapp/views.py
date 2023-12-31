from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Instructor,Course,Student,Enrollment,Assignment,Submission
import json
from datetime import datetime
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
            'student_id':student.student_id,
            'name': student.name,
            'gender': student.gender,
            'date_of_birth': student.date_of_birth,
            'major': student.major,
            'contact_number': student.contact_number,
        })

    return JsonResponse({'students_data': student_data})

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
                # If authentication is successful, get the student_id from the related Student model
                try:
                    student = Student.objects.get(user=user)  # Replace 'user' with the actual related field name
                    student_id = student.student_id  # Replace 'student_id' with the actual field name
                except Student.DoesNotExist:
                    student_id = None
                
                if student_id is not None:
                    # Generate a JWT token with student_id
                    payload = {
                        'user_id': user.id,
                        'username': user.username,
                        'student_id': student_id  # Add student_id to the payload
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
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            course = Course.objects.get(course_code=data['course_code'])  # Get the course object using course_code
            assignment = Assignment(
                title=data['title'],
                description=data['description'],
                due_date=data['due_date'],
                course=course  # Assign the course object
            )
            assignment.save()
            return JsonResponse({'message': 'Assignment created successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def create_submission(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            course = Course.objects.get(course_code=data['course_code'])  # Get the course object using course_code
            submission = Submission(
                assignment_id=data['assignment_id'],
                student_id=data['student_id'],
                submission_date=data['submission_date'],
                status=data['status'],
                remarks=data['remarks']
            )
            submission.save()
            return JsonResponse({'message': 'Submission created successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def list_assignments(request):
    if request.method == 'GET':
        assignments = Assignment.objects.all()
        
        assignment_list = []
        for assignment in assignments:
            data = {
                'id': assignment.id,
                'title': assignment.title,
                'description': assignment.description,
                'due_date': assignment.due_date,
                'course_code': assignment.course.course_code,  # Access the related course's code
            }
            assignment_list.append(data)
        return JsonResponse(assignment_list, safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def list_assignments_student(request, student_id):
    if request.method == 'GET':
        try:
            student = Student.objects.get(student_id=student_id)
        except Student.DoesNotExist:
            return JsonResponse({'error': 'Student not found'}, status=404)
        
        # Get the student's enrollments
        enrollments = Enrollment.objects.filter(student=student)
        course_codes = [enrollment.course.course_code for enrollment in enrollments]
        
        # Use the course codes to filter assignments
        assignments = Assignment.objects.filter(course__course_code__in=course_codes)
        
        assignment_list = []
        for assignment in assignments:
            data = {
                'id': assignment.id,
                'title': assignment.title,
                'description': assignment.description,
                'due_date': assignment.due_date,
                'course_code': assignment.course.course_code,
            }
            assignment_list.append(data)
        
        return JsonResponse(assignment_list, safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def update_delete_assignment(request, pk):
    if request.method == 'GET':
        try:
            assignment = Assignment.objects.get(pk=pk)
            print(assignment)
            # Create a dictionary with assignment data
            assignment_data = {
                'id': assignment.id,
                'title': assignment.title,
                'description': assignment.description,
                'due_date': assignment.due_date.strftime('%Y-%m-%d'), 
                'course_code': assignment.course.course_code,
            }
            return JsonResponse(assignment_data)
        except Assignment.DoesNotExist:
            return JsonResponse({'error': 'Assignment not found'}, status=404)
    elif request.method == 'PUT':
            assignment = Assignment.objects.get(pk=pk)
            data = json.loads(request.body)
            assignment.title = data['title']
            assignment.description = data['description']
            assignment.due_date = data['due_date']
            assignment.course_code = data['course_code']
            assignment.save()
            return JsonResponse({'message': 'Assignment updated successfully'})

    elif request.method == 'DELETE':
            assignment = Assignment.objects.get(pk=pk)
            assignment.delete()
            return JsonResponse({'message': 'Assignment deleted successfully'})
    
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def list_enrollments(request):
    return HttpResponse('list_enrollments')

# Submission views
@csrf_exempt
def submit_assignment(request, pk):
    try:
        assignment = Assignment.objects.get(pk=pk)
    except Assignment.DoesNotExist:
        return JsonResponse({'error': 'Assignment not found.'}, status=404)
    
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        student_info = data.get('student_info')  # Assuming you have a user profile for students
        submission_date_str = data.get('submission_date')
        status = 'Submitted'
        submission_choice = data.get('submission_choice')
        
        # Validate and format the submission date
        try:
            submission_date = datetime.strptime(submission_date_str, '%Y-%m-%d')
        except ValueError:
            return JsonResponse({'error': 'Invalid date format. Use YYYY-MM-DD.'}, status=400)
        
        # Make sure to correctly set the student field based on the provided student_info
        try:
            student = Student.objects.get(user_id=student_info['user_id'])   # Assuming userame is used for identification
        except User.DoesNotExist:
            return JsonResponse({'error': 'Student not found.'}, status=404)
        
        if submission_choice == 'file':
            submission_file = request.FILES.get('submission_file')
            submission = Submission(
                assignment=assignment,
                student=student,
                submission_date=submission_date,
                status=status,
                submission_file=submission_file,
            )
        elif submission_choice == 'url':
            submission_url = data.get('submission_url')
            submission = Submission(
                assignment=assignment,
                student=student,
                submission_date=submission_date,
                status=status,
                submission_url=submission_url,
            )
        elif submission_choice == 'text':
            submission_text = data.get('submission_text')
            submission = Submission(
                assignment=assignment,
                student=student,
                submission_date=submission_date,
                status=status,
                submission_text=submission_text,
            )
        else:
            return JsonResponse({'error': 'Invalid submission choice.'}, status=400)
        
        try:
            submission.save()
            return JsonResponse({'message': 'Assignment submitted successfully!'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Invalid request method.'}, status=405)

@csrf_exempt
def list_submissions(request):
    # Fetch a list of submissions from your database
    submissions = Submission.objects.all()  # You can customize this query as needed

    # Serialize the submissions queryset to JSON
    serialized_submissions = [{
        'id': submission.id,
        'assignment_id': submission.assignment_id,
        'student_id': submission.student_id,
        'submission_date': submission.submission_date.strftime('%Y-%m-%d %H:%M:%S'),
        'status': submission.status,
        'submission_file_url': submission.submission_file.url if submission.submission_file else None,
        'submission_url': submission.submission_url,
        'submission_text': submission.submission_text,
    } for submission in submissions]

    # Return the serialized data as a JSON response
    return JsonResponse({'submissions': serialized_submissions})


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


# Enrollment views
@csrf_exempt
def enroll_student(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))  # Parse JSON data from the request body
            student_id = data.get('student_id')
            course_code = data.get('course_code')

            # Check if the student exists
            try:
                student = Student.objects.get(student_id=student_id)
            except Student.DoesNotExist:
                return JsonResponse({'error': 'Student not found'}, status=404)

            # Check if the course exists
            try:
                course = Course.objects.get(course_code=course_code)
            except Course.DoesNotExist:
                return JsonResponse({'error': 'Course not found'}, status=404)

            # Check if the student is already enrolled in the course
            if Enrollment.objects.filter(student=student, course=course).exists():
                return JsonResponse({'error': 'Student is already enrolled in this course'}, status=400)

            # Create an enrollment record using the student and course objects
            enrollment = Enrollment.objects.create(student=student, course=course)

            return JsonResponse({'message': 'Enrollment request submitted successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    elif request.method == 'DELETE':
        # Delete all enrollment data
        Enrollment.objects.all().delete()
        return JsonResponse({'message': 'All enrollment data deleted successfully'})
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def get_enrollment_courses_by_student(request, student_id):
    try:
        # Retrieve all enrollment records for the given student
        enrollments = Enrollment.objects.filter(student__student_id=student_id)

        # Extract course details from enrollments
        courses_list = []

        # Serialize the courses and mark them as enrolled if they match the enrolled courses
        for enrollment in enrollments:
            serialized_course = {
                'course_code': enrollment.course.course_code,
                'course_name': enrollment.course.course_name,
                'department': enrollment.course.department,
                'credits': enrollment.course.credits,
                'description': enrollment.course.description,
                'enrolled': True
            }
            courses_list.append(serialized_course)

        return JsonResponse(courses_list, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


@csrf_exempt
def approve_enrollment(request, enrollment_id):
    try:
        enrollment = Enrollment.objects.get(pk=enrollment_id)
        enrollment.status = 'approved'
        enrollment.save()
        return JsonResponse({'message': 'Enrollment approved'})
    except Enrollment.DoesNotExist:
        return JsonResponse({'error': 'Enrollment not found'}, status=404)
@csrf_exempt
def reject_enrollment(request, enrollment_id):
    try:
        enrollment = Enrollment.objects.get(pk=enrollment_id)
        enrollment.status = 'rejected'
        enrollment.save()
        return JsonResponse({'message': 'Enrollment rejected'})
    except Enrollment.DoesNotExist:
        return JsonResponse({'error': 'Enrollment not found'}, status=404)
