import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-instructor-login',
  templateUrl: './instructor-login.component.html',
  styleUrls: ['./instructor-login.component.css']
})

export class InstructorLoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  login() {
    this.http.post(`${environment.apiUrl}/api/login/`, this.loginData).subscribe(
      (response: any) => {
        console.log(response.message); // Login successful message
        localStorage.setItem('username', this.loginData.username);
      },
      (error) => {
        console.error(error); // Handle login error
      }
    );
  }
}
