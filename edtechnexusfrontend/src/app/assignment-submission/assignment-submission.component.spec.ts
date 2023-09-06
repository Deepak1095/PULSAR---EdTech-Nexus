import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentSubmissionComponent } from './assignment-submission.component';

describe('AssignmentSubmissionComponent', () => {
  let component: AssignmentSubmissionComponent;
  let fixture: ComponentFixture<AssignmentSubmissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmentSubmissionComponent]
    });
    fixture = TestBed.createComponent(AssignmentSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
