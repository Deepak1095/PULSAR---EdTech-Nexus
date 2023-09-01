from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Instructor,Course
import json
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


# Student views
@csrf_exempt
def create_student(request):
    return HttpResponse('create_student')

@csrf_exempt
def list_students(request):
    return HttpResponse('list_students')

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
