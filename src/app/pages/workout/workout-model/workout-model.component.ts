import { Component, signal, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Workout } from '../../../models/Workout';
import { WorkoutService } from '../../../service/workout.service';
import { WorkoutAddDialogComponent } from '../workout-add-dialog/workout-add-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { WorkoutEditDialogComponent } from '../workout-edit-dialog/workout-edit-dialog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-workout-model',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    DatePipe,
  ],
  templateUrl: './workout-model.component.html',
  styleUrl: './workout-model.component.css',
})
export class WorkoutModelComponent {
  displayedColumns: string[] = [
    'actions',
    'updatedAt',
    'type',
    'duration',
    'caloriesBurned',
  ];

  workoutDetails = signal<Workout[]>([]);
  dataSource = new MatTableDataSource<Workout>([]);

  @ViewChild(MatTable) table: MatTable<Workout> | undefined;

  constructor(
    private readonly workoutService: WorkoutService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.workoutService.fetchWorkoutDetails().subscribe((value) => {
      this.workoutDetails.set(value.entity);
      console.log(value.entity);
      // Update dataSource when data is received
      this.dataSource.data = value.entity;
    });
  }

  addData() {
    const randomElementIndex = Math.floor(
      Math.random() * this.workoutDetails.length
    );
    this.dataSource.data = [
      ...this.dataSource.data,
      this.workoutDetails()[randomElementIndex],
    ];
    this.table?.renderRows();
  }

  deleteElement(element: any): void {
    this.workoutService.deleteWorkout(element?._id).subscribe((value) => {
      this.dataSource.data = this.dataSource.data.filter(
        (workout) => workout._id !== element._id
      );
      this.table?.renderRows();
    });
  }

  removeData() {
    this.dataSource.data = this.dataSource.data.slice(0, -1);
    this.table?.renderRows();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(WorkoutAddDialogComponent, {
      width: '400px', // Optional width
      data: { entity: this.dataSource }, // Optional data
    });

    // Handle dialog close event
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed', result);
    });
  }
  openEditDialog(element: Workout): void {
    const dialogRef = this.dialog.open(WorkoutEditDialogComponent, {
      width: '400px', // Optional width
      data: { entity: this.dataSource, element: element }, // Optional data
    });

    // Handle dialog close event
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed', result);
    });
  }
}
