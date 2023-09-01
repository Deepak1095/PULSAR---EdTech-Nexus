import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from '../models/course.model';

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

  constructor(private http: HttpClient) {}
 
  toggleCreateCourseForm(): void {
    this.showCreateCourseForm = !this.showCreateCourseForm;
  }
 
  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    // Fetch courses from the backend using HTTP GET request
    this.http.get<Course[]>('http://127.0.0.1:8000/courses/').subscribe(data => {
      console.log(data)
      this.courses = data;
    });
  }

  createCourse(): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  console.log(this.newCourse)
    // Create a new course using HTTP POST request
    this.http.post('http://127.0.0.1:8000/courses/', this.newCourse, httpOptions).subscribe(() => {

      this.fetchCourses();
      this.newCourse = new Course();
      this.showCreateCourseForm = !this.showCreateCourseForm;
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
      this.http.put(`http://127.0.0.1:8000/courses/${this.selectedCourse.id}/`, this.selectedCourse).subscribe(() => {
        this.fetchCourses();
        this.cancelEdit();
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
      this.http.delete(`http://127.0.0.1:8000/courses/${id}/`).subscribe(() => {
        this.fetchCourses();
        this.cancelDelete();
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
}
