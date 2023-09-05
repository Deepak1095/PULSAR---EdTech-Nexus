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
import { HomeComponent } from './home/home.component';
import { StudentCourseComponent } from './student-course/student-course.component';
import { JwtModule } from '@auth0/angular-jwt';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { InstructorAssignmentManagementComponent } from './instructor-assignment-management/instructor-assignment-management.component';
import { StudentAssignmentsComponent } from './student-assignments/student-assignments.component'; // Import SocketIoModule and SocketIoConfig

const socketIoConfig: SocketIoConfig = {
  url: 'ws://127.0.0.1:8000/ws/enrollment/', // Correct WebSocket URL
  options: {},
};

@NgModule({
  declarations: [
    AppComponent,
    InstructorManagementComponent,
    InstructorCourseManagementComponent,
    StudentRegistrationComponent,
    InstructorLoginComponent,
    StudentLoginComponent,
    HomeComponent,
    StudentCourseComponent,
    InstructorAssignmentManagementComponent,
    StudentAssignmentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return sessionStorage.getItem('jwtInstructorToken'); // Replace with your instructor token retrieval logic
        },
        skipWhenExpired: true, // Automatically skip requests when the token is expired
      },
    }),
    SocketIoModule.forRoot(socketIoConfig), // Configure WebSocket support
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
