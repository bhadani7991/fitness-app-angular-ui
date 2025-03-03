import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalAddUpdateDialogComponent } from './goal-add-update-dialog.component';

describe('GoalAddUpdateDialogComponent', () => {
  let component: GoalAddUpdateDialogComponent;
  let fixture: ComponentFixture<GoalAddUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalAddUpdateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalAddUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
