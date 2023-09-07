import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'edtechnexusfrontend';
  
  isLoggedIn = false;
  tokenCheckInterval: any;
  checkCount: number = 0;

  constructor(private router: Router) {}
  ngOnInit(): void {
    // Check if a token is present in session storage
    const token = sessionStorage.getItem('jwtStudentToken');

    if (token) {
      // Token is present, set isLoggedIn to true
      this.isLoggedIn = true;
    } else {
      // Token is not present, isLoggedIn remains false
      this.isLoggedIn = false;
    }

  }
   // Variable to toggle the mobile menu
   isMobileMenuOpen: boolean = false;

   // Variable to toggle the profile dropdown
   isProfileDropdownOpen: boolean = false;
 
   // Function to toggle the mobile menu
   toggleMobileMenu() {
     this.isMobileMenuOpen = !this.isMobileMenuOpen;
   }
 
   // Function to close the mobile menu
   closeMobileMenu() {
     this.isMobileMenuOpen = false;
   }
 
   // Function to toggle the profile dropdown
   toggleProfileDropdown() {
     this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
   }
   logout() {
    // Remove the token from session storage
    sessionStorage.removeItem('jwtStudentToken');
    this.isLoggedIn = false;
    // Navigate to the login page or perform other logout actions
    this.router.navigate(['/student-login']);
  }

  onLogin() {
    // Start the tokenCheckInterval when the "Login" link is clicked
    this.tokenCheckInterval = setInterval(() => {
      this.checkToken();
      console.log("hey")
    }, 5000); // Check every 5 seconds
  }
  
  checkToken() {
    const token = sessionStorage.getItem('jwtStudentToken');
  
    if (token) {
      // Token is present, set isLoggedIn to true
      this.isLoggedIn = true;
      
      // Clear the interval because the user is logged in
      clearInterval(this.tokenCheckInterval);
    } else if (this.checkCount >= 12) { // 12 checks * 5 seconds = 60 seconds
      // Clear the interval after 60 seconds (if token is not found)
      clearInterval(this.tokenCheckInterval);
    }
  
    // Increment the check count
    this.checkCount++;
  }
  
}