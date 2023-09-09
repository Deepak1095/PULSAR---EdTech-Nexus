// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;

  constructor() {
    // Check for a valid token in local session storage during service initialization
    const token = sessionStorage.getItem('jwtStudentToken');

    if (token) {
      // You should also validate the token on the server if needed
      this.isLoggedIn = true;
    }
  }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    sessionStorage.removeItem('jwtStudentToken');
    this.isLoggedIn = false;
  }
}
