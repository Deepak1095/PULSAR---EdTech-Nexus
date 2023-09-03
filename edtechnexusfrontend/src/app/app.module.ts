import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { InstructorManagementComponent } from './instructor-management/instructor-management.component';
import { InstructorCourseManagementComponent } from './instructor-course-management/instructor-course-management.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { InstructorLoginComponent } from './instructor-login/instructor-login.component';
import { StudentLoginComponent } from './student-login/student-login.component';

@NgModule({
  declarations: [
    AppComponent,
    InstructorManagementComponent,
    InstructorCourseManagementComponent,
    StudentRegistrationComponent,
    InstructorLoginComponent,
    StudentLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
