import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutAddDialogComponent } from './workout-add-dialog.component';

describe('WorkoutAddDialogComponent', () => {
  let component: WorkoutAddDialogComponent;
  let fixture: ComponentFixture<WorkoutAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutAddDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
