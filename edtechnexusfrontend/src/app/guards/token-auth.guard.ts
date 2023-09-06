import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Implement your token validation logic here
    const token = sessionStorage.getItem('jwtStudentToken'); // Replace with your actual token retrieval logic

    if (token) {
      return true; // User has a valid token, allow access
    } else {
      // User does not have a valid token, redirect to the login page or handle as needed
      this.router.navigate(['/student-register']);
      return false;
    }
  }
}
