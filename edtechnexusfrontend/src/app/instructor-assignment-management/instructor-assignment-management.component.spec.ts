import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorAssignmentManagementComponent } from './instructor-assignment-management.component';

describe('InstructorAssignmentManagementComponent', () => {
  let component: InstructorAssignmentManagementComponent;
  let fixture: ComponentFixture<InstructorAssignmentManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorAssignmentManagementComponent]
    });
    fixture = TestBed.createComponent(InstructorAssignmentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
