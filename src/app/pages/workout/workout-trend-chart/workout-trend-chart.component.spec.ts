import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutTrendChartComponent } from './workout-trend-chart.component';

describe('WorkoutTrendChartComponent', () => {
  let component: WorkoutTrendChartComponent;
  let fixture: ComponentFixture<WorkoutTrendChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutTrendChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutTrendChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
