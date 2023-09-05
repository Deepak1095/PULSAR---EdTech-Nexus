
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Assignment } from '../models/assignment.model';
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
    // Navigate to the submission page with the assignment ID as a parameter
    this.router.navigate(['/submission', id]);
  }
}
