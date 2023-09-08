import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css'],
})
export class StudentRegistrationComponent {
  formData = {
    email: '',
    password: '',
    name: '',
    date_of_birth: '',
    major: '',
    contact_number: '',
    gender: '',
  };
  isRegistrationSuccessful: boolean = false;
  isSubmitting: boolean = false;
  hasFormBeenSubmitted: boolean = false; // Track if the form has been submitted
  registrationError: string = ''; 
  isModalOpen: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}



  closeModal() {
    this.isModalOpen = false;
  }

  saveStudentDetails() {
    // Mark the form as submitted
    this.hasFormBeenSubmitted = true;

    // Disable the submit button while submitting
    this.isSubmitting = true;

    // Check for individual field errors and display them
    if (!this.validateFormData()) {
      // Enable the submit button again when validation fails
      this.isSubmitting = false;
      return;
    }

    // If validation passes, continue with registration
    const { email, password, name, date_of_birth, major, contact_number, gender } = this.formData;
    console.log(this.formData);

    // Make an HTTP POST request to register the student
    this.http.post(`${environment.apiUrl}/students/register/`, {
      email,
      password,
      name,
      date_of_birth,
      major,
      contact_number,
      gender,
    }).subscribe(
      (response: any) => {
        // Registration successful
        this.isRegistrationSuccessful = true;
        this.hasFormBeenSubmitted = false; // Reset the form submission flag
        this.isSubmitting = false;
        this.isModalOpen = true;
        this.formData = {
          email: '',
          password: '',
          name: '',
          date_of_birth: '',
          major: '',
          contact_number: '',
          gender: '',
        }; // Clear form data

      },
      (error) => {
        // Handle registration errors
        console.error('Student registration failed:', error);
        this.registrationError = 'Registration failed. Please try again.';
        this.isSubmitting = false;
      }
    );
  }

  private validateFormData(): boolean {
    // Implement your individual field validation logic here
    // Return true if all fields are valid; otherwise, return false
    const { email, password, name, date_of_birth, major, contact_number, gender } = this.formData;

    // Clear previous error messages
    this.clearErrorMessages();

    // Example validation for individual fields (you can customize this)
    const errors: string[] = [];
    if (!email) {
      errors.push('Please fill in your email.');
    }
    if (!password) {
      errors.push('Please fill in your password.');
    }
    if (!name) {
      errors.push('Please fill in your name.');
    }
    if (!date_of_birth) {
      errors.push('Please fill in your date of birth.');
    }
    if (!major) {
      errors.push('Please fill in your major.');
    }
    if (!contact_number) {
      errors.push('Please fill in your contact number.');
    }
    if (!gender) {
      errors.push('Please select your gender.');
    }

    // Display individual field error messages if the form has been submitted
    if (this.hasFormBeenSubmitted && errors.length > 0) {
      errors.forEach((error) => {
        // Log the error or display it in some way
        console.error(error);
      });
      return false;
    }

    return true;
  }

  private clearErrorMessages() {
    // Clear error messages when the form is re-submitted
    this.registrationError = '';
  }
}
