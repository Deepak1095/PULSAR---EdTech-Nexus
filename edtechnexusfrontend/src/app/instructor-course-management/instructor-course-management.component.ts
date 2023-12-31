import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from '../models/course.model';
import { Socket } from 'ngx-socket-io'; // Import Socket from ngx-socket-io
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-instructor-course-management',
  templateUrl: './instructor-course-management.component.html',
  styleUrls: ['./instructor-course-management.component.css']
})
export class InstructorCourseManagementComponent implements OnInit {
  courses: Course[] = [];
  newCourse: Course = new Course();
  selectedCourse: Course | null = null;
  showCreateCourseForm: boolean = false;
  showUpdateCourseForm: boolean = false;
  showDeleteConfirmModal: boolean = false;
  isCreating = false;
  isUpdating = false;
  isDeleting = false;

  constructor(private http: HttpClient) {} // Inject Socket

  toggleCreateCourseForm(): void {
    this.showCreateCourseForm = !this.showCreateCourseForm;
  }

  ngOnInit(): void {
    this.fetchCourses();
    // this.setupWebSocket(); // Initialize WebSocket connection
  }

  fetchCourses(): void {
    // Fetch courses from the backend using HTTP GET request
    this.http.get<Course[]>(`${environment.apiUrl}/courses/`).subscribe(data => {
      console.log(data);
      this.courses = data;
    });
  }

  createCourse(): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.isCreating=!this.isCreating

    // Create a new course using HTTP POST request
    this.http.post(`${environment.apiUrl}/courses/`, this.newCourse, httpOptions).subscribe(() => {
      this.fetchCourses();
      this.newCourse = new Course();
      this.showCreateCourseForm = !this.showCreateCourseForm;
      this.isCreating=!this.isCreating
    });
  }

  editCourse(course: Course): void {
    this.selectedCourse = { ...course };
  }

  toggleUpdateCourseForm(course: Course): void {
    this.showUpdateCourseForm = !this.showUpdateCourseForm;
    this.selectedCourse = { ...course };
  }

  updateCourse(): void {
    if (this.selectedCourse) {
      // Update the selected course using HTTP PUT request
      this.isUpdating=!this.isUpdating
      this.http.put(`${environment.apiUrl}/courses/${this.selectedCourse.id}/`, this.selectedCourse).subscribe(() => {
        this.fetchCourses();
        this.cancelEdit();
        this.isUpdating=!this.isUpdating
      });
    }
  }

  showDeleteConfirmation(course: Course): void {
    this.selectedCourse = course;
    this.showDeleteConfirmModal = true;
    this.showUpdateCourseForm = false;
  }

  deleteCourse(id: any): void {
    // Delete the course using HTTP DELETE request
    if (this.selectedCourse) {
      this.isDeleting=!this.isDeleting
      this.http.delete(`${environment.apiUrl}/courses/${id}/`).subscribe(() => {
        this.fetchCourses();
        this.cancelDelete();
        this.isDeleting=!this.isDeleting
      });
    }
  }

  cancelDelete(): void {
    this.selectedCourse = null;
    this.showDeleteConfirmModal = false;
  }

  cancelEdit(): void {
    this.selectedCourse = null;
    this.showUpdateCourseForm = !this.showUpdateCourseForm;
  }

  // Initialize WebSocket connection
  // setupWebSocket(): void {
  //   // Connect to your WebSocket server URL
  //   this.socket.connect(); // without any arguments


  //   // Subscribe to WebSocket events
  //   this.socket.on('enrollment_approved', (data: any) => {
  //     console.log('Enrollment approved:', data);
  //     // Handle enrollment approval, e.g., update the UI to indicate approval
  //   });

  //   this.socket.on('enrollment_rejected', (data: any) => {
  //     console.log('Enrollment rejected:', data);
  //     // Handle enrollment rejection, e.g., update the UI to indicate rejection
  //   });
  // }

  viewEnrollments(course: Course): void {
    // Send a request to your backend to fetch enrollments for the selected course
    this.http.get<any[]>(`${environment.apiUrl}/courses/${course.id}/enrollments/`).subscribe(enrollments => {
      console.log('Enrollments for course:', enrollments);

      // You can display the enrollments data as needed, for example, in a modal
      // Here, we'll simply log the data to the console
      enrollments.forEach(enrollment => {
        console.log('Student:', enrollment.student_name);
        console.log('Status:', enrollment.status);
        // Add more fields as needed
      });
      
      // You can also update your component state to store the enrollments and display them in your template
    }, error => {
      console.error('Failed to fetch enrollments:', error);
      // Handle the error, e.g., display an error message to the user
    });
  }
}
