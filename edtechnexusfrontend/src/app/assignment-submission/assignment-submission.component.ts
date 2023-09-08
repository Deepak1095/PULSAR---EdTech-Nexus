import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-assignment-submission',
  templateUrl: './assignment-submission.component.html',
  styleUrls: ['./assignment-submission.component.css']
})
export class AssignmentSubmissionComponent implements OnInit {
  assignmentId: number = 0;
  assignmentDetails: any; // Assignment-specific data
  studentInfo: any; // Student information
  isSubmitted: boolean = false; 
  submissionDate: string = '';
  submissionChoice: string = ''; // No pre-defined choice
  submissionUrl: string = '';
  submissionText: string = '';
  submissionFile: File | null = null; // Submission file

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Retrieve student information and assignment details using ActivatedRoute
   
    this.route.paramMap.subscribe(params => {
      this.assignmentId = Number(params.get('id')); // Get the 'id' parameter from the route
      const state = window.history.state; // Retrieve the state data
  
      if (state) {
        this.studentInfo = state.studentInfo;
        this.assignmentDetails = state.assignmentDetails;
  
        // Now you have access to the state data
        console.log('Student Info:', this.studentInfo);
        console.log('Assignment Details:', this.assignmentDetails);
      }
    });
    this.initializeForm()
  }

  initializeForm() {
    if (this.assignmentDetails) {
      // Populate the submission form fields with assignment data and student information
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
      const day = String(currentDate.getDate()).padStart(2, '0'); // Add leading zero if needed
      this.submissionDate = `${year}-${month}-${day}`; // Format the date as YYYY-MM-DD
    }
  }
  

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.submissionFile = fileList[0];
      console.log('Selected file:', this.submissionFile);
    }
  }

  onSubmit() {
    // Prepare the submission data as an object
    const submissionData = {
      submission_date: this.submissionDate,
      submission_choice: this.submissionChoice,
      submission_url: this.submissionUrl,
      submission_text: this.submissionText,
      student_info: this.studentInfo,
      submission_file: this.submissionFile,
       // Include the file if it's selected
    };
    console.log(submissionData)
  
    // Make an HTTP POST request to your backend API URL with the submissionData object
    this.http.post(`${environment.apiUrl}/submitAssignment/${this.assignmentId}/`, submissionData).subscribe(
      (response) => {
        console.log('Submission successful:', response);
        this.isSubmitted = true;
        // You can handle the response from the backend here
      },
      (error) => {
        console.error('Submission failed:', error);
        // You can handle any errors that occur during the submission here
      }
    );
  }
  
}

