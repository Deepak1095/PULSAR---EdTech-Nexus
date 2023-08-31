import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorManagementComponent } from './instructor-management.component';

describe('InstructorManagementComponent', () => {
  let component: InstructorManagementComponent;
  let fixture: ComponentFixture<InstructorManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorManagementComponent]
    });
    fixture = TestBed.createComponent(InstructorManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
