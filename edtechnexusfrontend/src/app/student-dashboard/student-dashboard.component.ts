import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  studentData: {
    student_id: string;
    name: string;
    gender: string;
    date_of_birth: string;
    major: string;
    email: string;
    contact_number: string;
  } | null = null;
  enrolledCourses: {
    id: number;
    course_code: string;
    course_name: string;
  }[] = [];
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
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

    // Fetch student details and enrolled courses from the backend
    this.http.get<{ student_id: string; name: string; gender: string; date_of_birth: string; major: string; email: string; contact_number: string; enrolled_courses: { id: number; course_code: string; course_name: string; }[]}>(`${environment.apiUrl}/studentDetails/${decodedToken.student_id}/`).subscribe(data => {
      this.studentData = data;
      this.enrolledCourses = data.enrolled_courses;
    });
  }
}
