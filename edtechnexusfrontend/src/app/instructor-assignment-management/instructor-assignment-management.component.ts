import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Assignment } from '../models/assignment.model'; // Import the Assignment model

@Component({
  selector: 'app-instructor-assignment-management',
  templateUrl: './instructor-assignment-management.component.html',
  styleUrls: ['./instructor-assignment-management.component.css']
})
export class InstructorAssignmentManagementComponent implements OnInit {
  assignmentData: Assignment = new Assignment(); 
  courseCodes: string[] = [];
  isFormVisible = false; // Flag to control the visibility of the form
  assignments: Assignment[] = []; // Array to store assignments
  editingAssignment: Assignment | null = null; // Assignment being edited
  showEditModal: boolean = false;
  showDeleteConfirmModal: boolean = false;
  courseCodeFilter: string = '';
  filteredAssignments: any[] = []; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCourseCodes();
    this.fetchAssignments();
  }
  
  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
  }

  createAssignment() {
    this.http.post('http://127.0.0.1:8000/assignments/create/', this.assignmentData).subscribe(
      (response: any) => {
        console.log('Assignment created:', response.message);
        this.isFormVisible = false; // Hide the form after successful submission
        this.fetchAssignments(); // Fetch updated assignments
      },
      (error) => {
        console.error('Error creating assignment:', error);
      }
    );
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

  editAssignment(assignment: any) {
    this.editingAssignment = { ...assignment };
  }
  
  toggleEditModal(assignment:Assignment):void{
    this.showEditModal=!this.showEditModal
    this.editingAssignment = { ...assignment };

  }
  updateAssignment() {
    if (this.editingAssignment) {
      this.http.put(`http://127.0.0.1:8000/assignments/${this.editingAssignment.id}/`, this.editingAssignment).subscribe(
        (response: any) => {
          console.log('Assignment updated:', response.message);
          this.fetchAssignments(); // Fetch updated assignments
          this.cancelDelete()
        },
        (error) => {
          console.error('Error updating assignment:', error);
        }
      );
    }
  }

  cancelEdit() {
    this.showEditModal = false;
    this.editingAssignment = null;
  }

  showDeleteConfirmation(assignment: any): void {
    this.editingAssignment = { ...assignment };
    this.showDeleteConfirmModal = true; // Show the delete confirmation modal
  }

  cancelDelete() {
    this.editingAssignment = null;
    this.showDeleteConfirmModal = false;
  }

  deleteAssignment(id: any): void {
    this.http.delete(`http://127.0.0.1:8000/assignments/${id}/`).subscribe(
      (response: any) => {
        console.log('Assignment deleted:', response.message);
        this.fetchAssignments(); // Fetch updated assignments
        this.showDeleteConfirmModal = false;
      },
      (error) => {
        console.error('Error deleting assignment:', error);
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

}
