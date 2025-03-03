import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalModelComponent } from './goal-model.component';

describe('GoalModelComponent', () => {
  let component: GoalModelComponent;
  let fixture: ComponentFixture<GoalModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
