import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor() {
    // Access environment variables in the constructor or other methods
    console.log(environment.production); // Example: false
    console.log(environment.apiUrl);      // Example: 'https://api.example.com'   // Example: 'your_development_api_key'
    console.log(environment.debug); 
  }
}
