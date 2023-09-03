import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'edtechnexusfrontend';
  
// In your Angular component
isProfileDropdownOpen = false;

toggleProfileDropdown() {
  this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
}

}
