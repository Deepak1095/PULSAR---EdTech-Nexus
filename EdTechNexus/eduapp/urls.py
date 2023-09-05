from django.urls import path
from . import views

urlpatterns = [
    # Instructor URLs
    path('instructors/', views.list_instructors, name='list-instructors'),
    path('instructors/<int:pk>/', views.instructor_detail, name='instructor-detail'),

    # Student URLs
    path('students/', views.list_students, name='list-students'),
    path('students/create/', views.create_student, name='create-student'),
    path('register/', views.register, name='register'),
    path('api/login/', views.custom_login, name='custom_login'),

    # Course URLs
    path('courses/', views.create_course, name='create-course'),
    path('courses/<int:pk>/', views.course_detail, name='course-details'),

    # Assignment URLs
    path('assignments/', views.list_assignments, name='list-assignments'),
    path('assignments/<int:pk>/', views.update_delete_assignment, name='update_delete_assignment'),
    path('assignments/create/', views.create_assignment, name='create-assignment'),

    # Enrollment URLs
    path('enroll/', views.enroll_student, name='enroll_student'),
    path('approve/<int:enrollment_id>/', views.approve_enrollment, name='approve_enrollment'),
    path('reject/<int:enrollment_id>/', views.reject_enrollment, name='reject_enrollment'),

    # Submission URLs
    path('submissions/', views.list_submissions, name='list-submissions'),
     path('submit_assignment/', views.assignment_submission, name='assignment_submission'),

    # Department URLs
    path('departments/', views.list_departments, name='list-departments'),
    path('departments/create/', views.create_department, name='create-department'),

    # Announcement URLs
    path('announcements/', views.list_announcements, name='list-announcements'),
    path('announcements/create/', views.create_announcement, name='create-announcement'),
]
