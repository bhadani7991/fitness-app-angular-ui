import { Component, Inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MyErrorStateMatcher } from '../../auth/login.component';
import { WorkoutService } from '../../../service/workout.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-workout-add-dialog',
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
  templateUrl: './workout-add-dialog.component.html',
  styleUrl: './workout-add-dialog.component.css',
})
export class WorkoutAddDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<WorkoutAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly workoutService: WorkoutService
  ) {}
  ngOnInit(): void {
    //console.log(this.data.entity.data);
  }

  matcher = new MyErrorStateMatcher();
  type = new FormControl<string>('', [Validators.required]);
  duration = new FormControl<number>(0, [Validators.required]);
  caloriesBurned = new FormControl<number>(0, [Validators.required]);
  updatedAt = new FormControl<Date>(new Date(), [Validators.required]);

  closeDialog(): void {
    this.dialogRef.close(); // Close the dialog
  }

  handleAddWorkout() {
    this.workoutService
      .addWorkoutDetails({
        type: this.type.value,
        duration: this.duration.value,
        caloriesBurned: this.caloriesBurned.value,
        updatedAt: this.updatedAt.value,
      })
      .subscribe((value) => {
        console.log(value.message);
        this.workoutService
          .fetchWorkoutDetails()
          .subscribe((value) => (this.data.entity.data = value.entity));
        this.dialogRef.close(); // Close the dialog
      });
  }
}
