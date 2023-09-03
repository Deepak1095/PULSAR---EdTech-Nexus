import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent {
//   formData: any = {}; // Object to store form data
//   generatedText: string = '';
//   constructor(private httpClient: HttpClient) {} // Inject HttpClient

//   onSubmit() {
//     // Send a POST request to your Django backend API to register the student
//     // Replace '/api/register_student/' with the actual API endpoint
//     this.httpClient.post('/api/register_student/', this.formData).subscribe(
//       (response) => {
//         console.log(response);
//         // Handle success here
//       },
//       (error) => {
//         console.error(error);
//         // Handle error here
//       }
//     );
//   }
//   sentences: string[] = [
//     "Welcome to Our University. Explore our diverse programs.",
//     "Our dedicated faculty ensures your success.",
//     "Join our vibrant community of students.",
//     "We are committed to your education.",
//     "Discover endless opportunities with us."
//   ];
//   currentIndex: number = 0;

//   ngOnInit() {
//     // Automatically display sentences every 5 seconds (adjust the interval as needed)
//     setInterval(() => {
//       this.generateText();
//     }, 2000); // 5000 milliseconds (5 seconds)
//   }

//   generateText() {
//     if (this.currentIndex === this.sentences.length) {
//       // Reset the index when it reaches the end of the sentence list
//       this.currentIndex = 0;
//     }

//     const sentence = this.sentences[this.currentIndex];
//     this.generatedText = sentence;
//     this.currentIndex++;
//   }
// }

  formData = {
    email: '',
    password: '',
    name: '',
    date_of_birth: '',
    major: '',
    contact_number: '',
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
    const { email, password, name, date_of_birth, major, contact_number } = this.formData;

    // Make an HTTP POST request to register the student
    this.http.post('https://your-backend-api-url/api/student-registration', {
      email,
      password,
      name,
      date_of_birth,
      major,
      contact_number,
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
