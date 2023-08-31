from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Instructor, Student, Course, Assignment, Enrollment, Submission, Department, Announcement

# Instructor views
@csrf_exempt
def create_instructor(request):
    return HttpResponse('create_instructor')

@csrf_exempt
def list_instructors(request):
    return HttpResponse('list_instructors')

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
