import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorManagementComponent } from './instructor-management/instructor-management.component';
import { InstructorCourseManagementComponent } from './instructor-course-management/instructor-course-management.component';
const routes: Routes = [
  { path: 'instructor-course-management', component: InstructorCourseManagementComponent },
  { path: 'instructors', component: InstructorManagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
