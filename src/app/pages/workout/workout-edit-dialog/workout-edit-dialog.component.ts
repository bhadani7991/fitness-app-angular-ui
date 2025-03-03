import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MyErrorStateMatcher } from '../../auth/login.component';
import { WorkoutService } from '../../../service/workout.service';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Workout } from '../../../models/Workout';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-workout-edit-dialog',
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
  templateUrl: './workout-edit-dialog.component.html',
  styleUrl: './workout-edit-dialog.component.css',
})
export class WorkoutEditDialogComponent {
  matcher = new MyErrorStateMatcher();
  type = new FormControl<string>('', [Validators.required]);
  duration = new FormControl<number>(0, [Validators.required]);
  caloriesBurned = new FormControl<number>(0, [Validators.required]);
  updatedAt = new FormControl<Date>(new Date(), [Validators.required]);
  constructor(
    public dialogRef: MatDialogRef<WorkoutEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly workoutService: WorkoutService
  ) {}
  ngOnInit(): void {
    if (this.data?.element) {
      this.type = new FormControl<string>(this.data.element.type, [
        Validators.required,
      ]);
      this.duration = new FormControl<number>(this.data.element.duration, [
        Validators.required,
      ]);
      this.caloriesBurned = new FormControl<number>(
        this.data.element.caloriesBurned,
        [Validators.required]
      );
      this.updatedAt = new FormControl<Date>(this.data.element.updatedAt, [
        Validators.required,
      ]);
    } else {
      console.error('No data received for the workout');
    }
  }

  closeDialog(): void {
    this.dialogRef.close(); // Close the dialog
  }

  handleUpdateWorkout() {
    this.workoutService
      .updateWorkout(this.data.element._id, {
        type: this.type.value,
        duration: this.duration.value,
        caloriesBurned: this.caloriesBurned.value,
        updatedAt: this.updatedAt.value,
      })
      .subscribe((value) => {
        this.data.entity.data.forEach((workout: Workout) => {
          if (workout._id === value.updatedData._id) {
            workout.type = value.updatedData.type;
            workout.caloriesBurned = value.updatedData.caloriesBurned;
            workout.duration = value.updatedData.duration;
            workout.updatedAt = value.updatedData.updatedAt;
          }
        });
        this.dialogRef.close(); // Close the dialog
      });
  }
}
