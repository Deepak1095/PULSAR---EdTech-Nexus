import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorManagementComponent } from './instructor-management/instructor-management.component';
import { InstructorCourseManagementComponent } from './instructor-course-management/instructor-course-management.component';
import { InstructorLoginComponent } from './instructor-login/instructor-login.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { HomeComponent } from './home/home.component';
import { StudentCourseComponent } from './student-course/student-course.component';
import { InstructorAssignmentManagementComponent } from './instructor-assignment-management/instructor-assignment-management.component';
import { StudentAssignmentsComponent } from './student-assignments/student-assignments.component';
import { AssignmentSubmissionComponent } from './assignment-submission/assignment-submission.component';

const routes: Routes = [
  { path: 'instructor-course-management', component: InstructorCourseManagementComponent },
  { path: 'instructors', component: InstructorManagementComponent },
  {path:'student-register',component:StudentRegistrationComponent, pathMatch: 'full'},
  {path:'instructor-login',component:InstructorLoginComponent},
  { path: 'student-login', component: StudentLoginComponent },
  { path: 'student-course-management', component: StudentCourseComponent },
  {path:'home',component:HomeComponent},
  {path:'instructor-assignment-management',component:InstructorAssignmentManagementComponent},
  {path:'student-assignment-management',component:StudentAssignmentsComponent},
  { path: 'submission/:id', component: AssignmentSubmissionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
