from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Instructor

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
        data = {
            'name': request.POST.get('name'),
            'gender': request.POST.get('gender'),
            'date_of_birth': request.POST.get('date_of_birth'),
            'department': request.POST.get('department'),
            'email': request.POST.get('email'),
            'contact_number': request.POST.get('contact_number'),
        }
        print(data)
        # instructor = Instructor(**data)
        # instructor.save()
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
        instructor.name = request.POST.get('name')
        instructor.gender = request.POST.get('gender')
        instructor.date_of_birth = request.POST.get('date_of_birth')
        instructor.department = request.POST.get('department')
        instructor.email = request.POST.get('email')
        instructor.contact_number = request.POST.get('contact_number')
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
    return HttpResponse('create_course')

@csrf_exempt
def list_courses(request):
    return HttpResponse('list_courses')

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
