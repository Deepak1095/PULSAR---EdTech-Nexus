import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course.model';
import { JwtHelperService } from '@auth0/angular-jwt'; // Import JwtHelperService

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.css']
})
export class StudentCourseComponent implements OnInit {
  courses: Course[] = [];
  jwtHelper: JwtHelperService = new JwtHelperService(); // Create an instance of JwtHelperService

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    // Fetch courses from the backend using HTTP GET request
    this.http.get<Course[]>('http://127.0.0.1:8000/courses/').subscribe(data => {
      this.courses = data;
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
    console.log(decodedToken)
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

    this.http.post('http://127.0.0.1:8000/enroll/', enrollmentData).subscribe(response => {
      console.log('Enrollment request submitted successfully');
      // You can handle the response as needed (e.g., show a success message)
    }, error => {
      console.error('Enrollment request failed:', error);
      // Handle the error (e.g., show an error message)
    });
  }
}
