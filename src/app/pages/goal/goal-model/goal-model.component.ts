import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { GoalAddUpdateDialogComponent } from '../goal-add-update-dialog/goal-add-update-dialog.component';
import { GoalService } from '../../../service/goal.service';
import { Goal } from '../../../models/Goal';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-goal-model',
  imports: [MatCardModule, MatButtonModule, MatListModule],
  templateUrl: './goal-model.component.html',
  styleUrl: './goal-model.component.css',
})
export class GoalModelComponent {
  goal = signal<Goal>({
    targetWeight: 0,
    workoutsPerWeek: 0,
    caloriesBurnedGoal: 0,
    updatedAt: new Date(),
  });

  ngOnInit(): void {
    this.goalService
      .fetchActiveGoal()
      .subscribe((goalDetails) => this.goal.set(goalDetails.entity));
  }
  constructor(
    private readonly dialog: MatDialog,
    private readonly goalService: GoalService
  ) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(GoalAddUpdateDialogComponent, {
      width: '400px', // Optional width
      data: {}, // Optional data
    });

    // Handle dialog close event
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
