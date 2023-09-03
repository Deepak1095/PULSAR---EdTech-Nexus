import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorManagementComponent } from './instructor-management/instructor-management.component';
import { InstructorCourseManagementComponent } from './instructor-course-management/instructor-course-management.component';
import { InstructorLoginComponent } from './instructor-login/instructor-login.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { StudentLoginComponent } from './student-login/student-login.component';
const routes: Routes = [
  { path: 'instructor-course-management', component: InstructorCourseManagementComponent },
  { path: 'instructors', component: InstructorManagementComponent },
  {path:'student-register',component:StudentRegistrationComponent},
  {path:'instructor-login',component:InstructorLoginComponent},
  { path: 'student-login', component: StudentLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
