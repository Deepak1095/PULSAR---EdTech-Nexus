import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent {

  formData = {
    email: '',
    password: '',
    name: '',
    date_of_birth: '',
    major: '',
    contact_number: '',
    gender:''
  };
  registrationError: string = '';
  isRegistrationSuccessful: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  saveStudentDetails() {
    // Validate the form data here (e.g., check if required fields are filled)

    if (!this.validateFormData()) {
      // If form data is not valid, show an error message and return
      this.registrationError = 'Please fill in all required fields.';
      return;
    }

    // If validation passes, continue with registration
    const { email, password, name, date_of_birth, major, contact_number,gender } = this.formData;
    console.log(this.formData)
    // Make an HTTP POST request to register the student
    this.http.post(`${environment.apiUrl}/students/register/`, {
      email,
      password,
      name,
      date_of_birth,
      major,
      contact_number,
      gender
    }).subscribe(
      (response: any) => {
        // Registration successful
        this.isRegistrationSuccessful = true;
        this.registrationError = '';

        // Redirect to the login page
        this.router.navigate(['/student-login']);
      },
      (error) => {
        // Handle registration errors
        console.error('Student registration failed:', error);
        this.registrationError = 'Registration failed. Please try again.';
      }
    );
  }

  private validateFormData(): boolean {
    // Implement your form validation logic here
    // Return true if the form is valid; otherwise, return false
    const { email, password, name, date_of_birth, major, contact_number } = this.formData;

    // Example validation (you can customize this)
    return !!email && !!password && !!name && !!date_of_birth && !!major && !!contact_number;
  }
}
