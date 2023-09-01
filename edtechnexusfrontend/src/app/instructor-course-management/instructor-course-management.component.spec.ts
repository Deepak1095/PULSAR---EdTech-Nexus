import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCourseManagementComponent } from './instructor-course-management.component';

describe('InstructorCourseManagementComponent', () => {
  let component: InstructorCourseManagementComponent;
  let fixture: ComponentFixture<InstructorCourseManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorCourseManagementComponent]
    });
    fixture = TestBed.createComponent(InstructorCourseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
