from django.urls import path
from . import views

urlpatterns = [
    # Instructor URLs
    path('instructors/', views.list_instructors, name='list-instructors'),
    path('instructors/<int:pk>/', views.instructor_detail, name='instructor-detail'),

    # Student URLs
    path('students/', views.list_students, name='list-students'),
    path('students/create/', views.create_student, name='create-student'),

    # Course URLs
    path('courses/', views.create_course, name='create-course'),
    path('courses/<int:pk>/', views.course_detail, name='course-details'),

    # Assignment URLs
    path('assignments/', views.list_assignments, name='list-assignments'),
    path('assignments/create/', views.create_assignment, name='create-assignment'),

    # Enrollment URLs
    path('enrollments/', views.list_enrollments, name='list-enrollments'),
    path('enrollments/create/', views.create_enrollment, name='create-enrollment'),

    # Submission URLs
    path('submissions/', views.list_submissions, name='list-submissions'),
    path('submissions/create/', views.create_submission, name='create-submission'),

    # Department URLs
    path('departments/', views.list_departments, name='list-departments'),
    path('departments/create/', views.create_department, name='create-department'),

    # Announcement URLs
    path('announcements/', views.list_announcements, name='list-announcements'),
    path('announcements/create/', views.create_announcement, name='create-announcement'),
]
