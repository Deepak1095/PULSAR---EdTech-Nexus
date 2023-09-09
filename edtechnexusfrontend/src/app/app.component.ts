import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'edtechnexusfrontend';
  
  
  tokenCheckInterval: any;
  checkCount: number = 0;

  constructor(private router: Router,private authService: AuthService) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  ngOnInit(): void {console.log(this.authService.isLoggedIn)}

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
    this.authService.logout()
    this.router.navigate(['/student-login']);
  }
  
}