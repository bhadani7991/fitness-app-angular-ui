import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutModelComponent } from './workout-model.component';

describe('WorkoutModelComponent', () => {
  let component: WorkoutModelComponent;
  let fixture: ComponentFixture<WorkoutModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
