import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.css']
})
export class StudentCourseComponent implements OnInit {
  courses: Course[] = [];
  enrolledCourses: Course[] = []; // Enrolled courses
  jwtHelper: JwtHelperService = new JwtHelperService(); // Create an instance of JwtHelperService

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCourses();
    this.fetchEnrolledCourses(); // Fetch enrolled courses
  }

  fetchCourses(): void {
    // Fetch all courses from the backend using HTTP GET request
    this.http.get<Course[]>(`${environment.apiUrl}/courses/`).subscribe(data => {
      this.courses = data || [];
      // Check enrollment status for each course
      this.courses.forEach(course => {
        course.enrolled = this.isCourseEnrolled(course); // Set enrolled property
      });
    });
  }

  fetchEnrolledCourses(): void {
    // Retrieve the student's ID from the JWT token
    const token = sessionStorage.getItem('jwtStudentToken');
    if (!token) {
      console.error('Token not found in session storage');
      return;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    if (!decodedToken || !decodedToken.student_id) {
      console.error('Student ID not found in the token payload');
      return;
    }
    const studentId = decodedToken.student_id;

    // Fetch enrolled courses for the student
    this.http.get<Course[]>(`${environment.apiUrl}/enrollments/${studentId}/`).subscribe(data => {
      this.enrolledCourses = data || []; // Initialize enrolledCourses as an empty array if data is null
      // Check enrollment status for each course
      this.courses.forEach(course => {
        course.enrolled = this.isCourseEnrolled(course); // Set enrolled property
      });
    });
  }

  enroll(course: Course): void {
    // Retrieve the token from session storage
    const token = sessionStorage.getItem('jwtStudentToken');

    if (!token) {
      console.error('Token not found in session storage');
      // Handle the case where the token is missing
      return;
    }

    // Decode the token to access its payload
    const decodedToken = this.jwtHelper.decodeToken(token);

    if (!decodedToken || !decodedToken.student_id) {
      console.error('Student ID not found in the token payload');
      // Handle the case where student ID is missing in the payload
      return;
    }

    // Use the course code for enrollment
    const courseCode = course.course_code;

    const enrollmentData = {
      student_id: decodedToken.student_id,
      course_code: courseCode
      // Add any other required data here
    };

    this.http.post(`${environment.apiUrl}/enroll/`, enrollmentData).subscribe(response => {
      console.log('Enrollment request submitted successfully');
      // You can handle the response as needed (e.g., show a success message)
      // Refresh enrolled courses after successful enrollment
      this.fetchEnrolledCourses();
    }, error => {
      console.error('Enrollment request failed:', error);
      // Handle the error (e.g., show an error message)
    });
  }

  // Function to check if a course is enrolled by the student
  isCourseEnrolled(course: Course): boolean {
    if (!this.enrolledCourses) {
      return false;
    }
  
    for (const enrolledCourse of this.enrolledCourses) {
      if (enrolledCourse.course_code === course.course_code) {
        return true;
      }
    }
  
    return false;
  }
  
}
