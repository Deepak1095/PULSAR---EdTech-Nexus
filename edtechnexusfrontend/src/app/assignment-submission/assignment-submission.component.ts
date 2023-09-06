import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-assignment-submission',
  templateUrl: './assignment-submission.component.html',
  styleUrls: ['./assignment-submission.component.css']
})
export class AssignmentSubmissionComponent implements OnInit {
  assignmentId: number = 0;
  assignmentDetails: any; // Assignment-specific data
  studentInfo: any; // Student information

  submissionDate: string = '';
  submissionChoice: string = ''; // No pre-defined choice
  submissionUrl: string = '';
  submissionText: string = '';
  submissionFile: File | null = null; // Submission file

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Retrieve the assignmentId from the route parameter
    this.route.params.subscribe(params => {
      this.assignmentId = +params['id']; // Assuming 'id' is the parameter name and converting it to a number
    });

    // Retrieve student information and assignment details using ActivatedRoute
    this.route.data.subscribe(data => {
      this.studentInfo = data['studentInfo'];
      this.assignmentDetails = data['assignmentDetails'];

      // Initialize the submission form with the retrieved data
      this.initializeForm();
    });
  }

  initializeForm() {
    if (this.assignmentDetails) {
      // Populate the submission form fields with assignment data and student information
      this.submissionDate = new Date().toISOString(); // Set the current date and time
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
      submission_file: this.submissionFile, // Include the file if it's selected
    };
  
    // Make an HTTP POST request to your backend API URL with the submissionData object
    const apiUrl = 'http://127.0.0.1:8000/submit_assignment/' + this.assignmentId + '/';
    console.log(submissionData)
    // this.http.post(apiUrl, submissionData).subscribe(
    //   (response) => {
    //     console.log('Submission successful:', response);
    //     // You can handle the response from the backend here
    //   },
    //   (error) => {
    //     console.error('Submission failed:', error);
    //     // You can handle any errors that occur during the submission here
    //   }
    // );
  }
  
}

