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
import { TokenAuthGuard } from './guards/token-auth.guard';

const routes: Routes = [
  { path: 'instructor-course-management', component: InstructorCourseManagementComponent, canActivate: [TokenAuthGuard]   },
  { path: 'instructors', component: InstructorManagementComponent, canActivate: [TokenAuthGuard]   },
  { path: 'student-course-management', component: StudentCourseComponent, canActivate: [TokenAuthGuard] },
  {path:'instructor-assignment-management',component:InstructorAssignmentManagementComponent, canActivate: [TokenAuthGuard]  },
  {path:'student-assignment-management',component:StudentAssignmentsComponent, canActivate: [TokenAuthGuard] },
  { path: 'submission/:id', component: AssignmentSubmissionComponent, canActivate: [TokenAuthGuard]   },
  {path:'',component:HomeComponent, pathMatch: 'full'},
  {path:'student-register',component:StudentRegistrationComponent },
  {path:'instructor-login',component:InstructorLoginComponent},
  { path: 'student-login', component: StudentLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
