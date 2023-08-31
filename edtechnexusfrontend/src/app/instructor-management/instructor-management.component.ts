import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Instructor } from '../models/instructor.model';

@Component({
  selector: 'app-instructor-management',
  templateUrl: './instructor-management.component.html',
  styleUrls: ['./instructor-management.component.css']
})
export class InstructorManagementComponent implements OnInit {
  instructors: Instructor[] = [];
  newInstructor: Instructor = new Instructor();
  selectedInstructor: Instructor | null = null;
  showCreateInstructorForm: boolean = false;
  showUpdateInstructorForm: boolean = false;
  showDeleteConfirmModal: boolean = false;

  constructor(private http: HttpClient) {}
 
  toggleCreateInstructorForm(): void {
    this.showCreateInstructorForm = !this.showCreateInstructorForm;
  }
 
  ngOnInit(): void {
    this.fetchInstructors();
  }

  fetchInstructors(): void {
    // Fetch instructors from the backend using HTTP GET request
    this.http.get<Instructor[]>('http://127.0.0.1:8000/instructors/').subscribe(data => {
      console.log('data',data)
      this.instructors = data;
    });
  }

  createInstructor(): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  
    // Create a new instructor using HTTP POST request
    this.http.post('http://127.0.0.1:8000/instructors/', this.newInstructor,httpOptions).subscribe(() => {
      this.fetchInstructors();
      this.newInstructor = new Instructor();
      this.showCreateInstructorForm = !this.showCreateInstructorForm;
    });
  }

  editInstructor(instructor: Instructor): void {
    this.selectedInstructor = { ...instructor };
  }

  toggleUpdateInstructorForm(instructor: Instructor): void {
    this.showUpdateInstructorForm = !this.showUpdateInstructorForm;
    this.selectedInstructor = { ...instructor };
  }
  updateInstructor(): void {
    if (this.selectedInstructor) {
      // Update the selected instructor using HTTP PUT request
      this.http.put(`http://127.0.0.1:8000/instructors/${this.selectedInstructor.id}/`, this.selectedInstructor).subscribe(() => {
        this.fetchInstructors();
        this.cancelEdit();
      });
    }
  }
  
  showDeleteConfirmation(instructor: Instructor): void {
    this.selectedInstructor = instructor;
    this.showDeleteConfirmModal = true;
    this.showUpdateInstructorForm = false;
  }


  deleteInstructor(id:any): void {
    // Delete the instructor using HTTP DELETE request
    if (this.selectedInstructor) {
    this.http.delete(`http://127.0.0.1:8000/instructors/${id}/`).subscribe(() => {
      this.fetchInstructors();
      this.cancelDelete()
    });
  }
  }
  cancelDelete(): void {
    this.selectedInstructor = null;
    this.showDeleteConfirmModal = false;
  }

  cancelEdit(): void {
    this.selectedInstructor = null;
    this.showUpdateInstructorForm = !this.showUpdateInstructorForm;
  }
}
