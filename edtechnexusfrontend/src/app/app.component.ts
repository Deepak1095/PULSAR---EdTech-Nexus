import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'edtechnexusfrontend';
  
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
}