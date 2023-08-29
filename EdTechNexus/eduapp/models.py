from django.db import models
from django.contrib.auth.models import User

# Represents a Student in the system
class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Link to the User model for authentication
    name = models.CharField(max_length=100)
    student_id = models.CharField(max_length=4, unique=True)  # 4-digit unique student ID
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')])
    date_of_birth = models.DateField()
    major = models.CharField(max_length=50)
    email = models.EmailField()
    contact_number = models.CharField(max_length=20)

    def __str__(self):
        return self.name

# Represents an Instructor in the system
class Instructor(models.Model):
    name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')])
    date_of_birth = models.DateField()
    department = models.CharField(max_length=50)
    email = models.EmailField()
    contact_number = models.CharField(max_length=20)

    def __str__(self):
        return self.name

# Represents a Course offered by the institution
class Course(models.Model):
    course_code = models.CharField(max_length=10)
    course_name = models.CharField(max_length=100)
    department = models.CharField(max_length=50)
    credits = models.PositiveIntegerField()
    description = models.TextField()

    def __str__(self):
        return self.course_code + ' - ' + self.course_name

# Represents an Assignment for a specific course
class Assignment(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    due_date = models.DateField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

# Represents the enrollment of a student in a course
class Enrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

# Represents a submission made by a student for an assignment
class Submission(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    submission_date = models.DateField()
    status = models.CharField(max_length=10, choices=[('Submitted', 'Submitted'), ('Late', 'Late'), ('Graded', 'Graded')])
    remarks = models.TextField()

# Represents a Department within the institution
class Department(models.Model):
    name = models.CharField(max_length=50)
    courses = models.ManyToManyField(Course, related_name='departments')

    def __str__(self):
        return self.name

# Represents an Announcement for a course or department
class Announcement(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    publish_date = models.DateField()
    course = models.ForeignKey(Course, null=True, blank=True, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, null=True, blank=True, on_delete=models.CASCADE)
