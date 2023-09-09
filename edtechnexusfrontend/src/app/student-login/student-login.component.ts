import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent {
  formData = {
    email: '',
    password: '',
  };
  loginError: string = '';

  constructor(private http: HttpClient, private router: Router,private authService: AuthService) {}

  onSubmit() {
    const { email, password } = this.formData;
  
    // Create a URL for the login request
    const loginUrl = `${environment.apiUrl}/student/login/`;
  
    // Prepare the login data
    const loginData = {
      email,
      password,
    };
  
    // Make the POST request
    this.http.post(loginUrl, loginData).subscribe({
      next: (response: any) => {
        const token = response.token;
  
        // Store the token in session storage
        sessionStorage.setItem('jwtStudentToken', token);
        this.authService.login();
        // Redirect to the dashboard page
        this.router.navigate(['/']);
      },
      error: (error) => {
        // Handle student authentication errors
        console.error('Student login failed:', error);
        this.loginError = 'Invalid email or password. Please try again.';
      },
    });
  }
  
}
