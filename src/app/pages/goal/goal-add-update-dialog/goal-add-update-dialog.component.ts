import { Component, Inject } from '@angular/core';
import { MyErrorStateMatcher } from '../../auth/login.component';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { GoalService } from '../../../service/goal.service';

@Component({
  selector: 'app-goal-add-update-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
  ],
  templateUrl: './goal-add-update-dialog.component.html',
  styleUrl: './goal-add-update-dialog.component.css',
})
export class GoalAddUpdateDialogComponent {
  matcher = new MyErrorStateMatcher();
  targetWeight = new FormControl<number>(0, [Validators.required]);
  workoutsPerWeek = new FormControl<number>(0, [Validators.required]);
  caloriesBurnedGoal = new FormControl<number>(0, [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<GoalAddUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly goalService: GoalService
  ) {}
  ngOnInit(): void {
    /**
     * targetWeight: 0,
    workoutsPerWeek: 0,
    caloriesBurnedGoal: 0,
    updatedAt: new Date(),
     */
    if (this.data?.goal) {
      console.log(this.data.goal);
      this.workoutsPerWeek.setValue(this.data.goal.workoutsPerWeek);
      this.caloriesBurnedGoal.setValue(this.data.goal.caloriesBurnedGoal);

      this.targetWeight.setValue(this.data.goal.targetWeight);
    } else {
      console.error('No data received for the workout');
    }
  }

  closeDialog(): void {
    this.dialogRef.close(); // Close the dialog
  }
  handleSaveUpdateGoal() {
    try {
      this.goalService
        .addGoal({
          targetWeight: this.targetWeight.value,
          caloriesBurnedGoal: this.caloriesBurnedGoal.value,
          workoutsPerWeek: this.workoutsPerWeek.value,
        })
        .subscribe((value) => {
          this.dialogRef.close();
        });
    } catch (error) {
      console.log(error);
    }
  }
}
