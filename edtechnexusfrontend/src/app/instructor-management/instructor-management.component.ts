import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchInstructors();
  }

  fetchInstructors(): void {
    // Fetch instructors from the backend using HTTP GET request
    this.http.get<Instructor[]>('http://127.0.0.1:8000/instructors/').subscribe(data => {
      console.log(data)
      this.instructors = data;
    });
  }

  createInstructor(): void {
    // Create a new instructor using HTTP POST request
    this.http.post('http://127.0.0.1:8000/instructors/', this.newInstructor).subscribe(() => {
      this.fetchInstructors();
      this.newInstructor = new Instructor();
    });
  }

  editInstructor(instructor: Instructor): void {
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
  

  deleteInstructor(id: number): void {
    // Delete the instructor using HTTP DELETE request
    this.http.delete(`/http://127.0.0.1:8000/instructors/${id}/`).subscribe(() => {
      this.fetchInstructors();
    });
  }

  cancelEdit(): void {
    this.selectedInstructor = null;
  }
}
