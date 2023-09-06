
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Assignment } from '../models/assignment.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-student-assignments',
  templateUrl: './student-assignments.component.html',
  styleUrls: ['./student-assignments.component.css']
})
export class StudentAssignmentsComponent {

  assignments: Assignment[] = []; // Define the Assignment type
  courseCodes: string[] = [];
  courseCodeFilter: string = '';
  filteredAssignments: any[] = []; 
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchAssignments();
    this.fetchCourseCodes()
  }
   
  fetchAssignments() {
    this.http.get<Assignment[]>('http://127.0.0.1:8000/assignments/').subscribe(
      (response: Assignment[]) => {
        this.assignments = response;
        this.filteredAssignments = [...this.assignments];
      },
      (error) => {
        console.error('Error fetching assignments:', error);
      }
    );
  }  

  fetchCourseCodes() {
    // Make an HTTP request to your backend to fetch course codes
    this.http.get<any[]>('http://127.0.0.1:8000/courses/').subscribe(
      (response: any[]) => {
        // Extract course codes from the response and store them in the courseCodes array
        this.courseCodes = response.map((course) => course.course_code);
        console.log(this.courseCodes);
      },
      (error) => {
        console.error('Error fetching course codes:', error);
        // Handle error
      }
    );
  }

  applyFilter() {
    if (this.courseCodeFilter.trim() === '') {
      this.filteredAssignments = [...this.assignments];
    } else {
      this.filteredAssignments = this.assignments.filter(assignment => {
        return assignment.course_code.toLowerCase().includes(this.courseCodeFilter.toLowerCase());
      });
    }
  }

  goToSubmissionPage(id: any): void {
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


    // Make an HTTP request to fetch the assignment details by ID
    this.http.get<Assignment>(`http://127.0.0.1:8000/assignments/${id}/`).subscribe(
      (assignmentDetails: Assignment) => {
        // Navigate to the submission page with the assignment ID, student info, and assignment details as parameters
        this.router.navigate(['/submission', id], {
          state: { studentInfo:decodedToken.studentInfo, assignmentDetails } // Include studentInfo and assignmentDetails in the state
        });
      },
      (error) => {
        console.error('Error fetching assignment details:', error);
        // Handle the error when fetching assignment details
      }
    );
  }
}
