import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorManagementComponent } from './instructor-management/instructor-management.component';

const routes: Routes = [
  { path: 'inst', component: InstructorManagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
