import { Component, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { Workout } from '../../../models/Workout';
import { WorkoutService } from '../../../service/workout.service';

@Component({
  selector: 'app-workout-model',
  imports: [MatButtonModule, MatTableModule],
  templateUrl: './workout-model.component.html',
  styleUrl: './workout-model.component.css',
})
export class WorkoutModelComponent {
  displayedColumns: string[] = [
    'updatedAt',
    'type',
    'duration',
    'caloriesBurned',
  ];

  workoutDetails = signal<Workout[]>([]);
  dataSource = new MatTableDataSource<Workout>([]);

  @ViewChild(MatTable) table: MatTable<Workout> | undefined;

  constructor(private readonly workoutService: WorkoutService) {}

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

  removeData() {
    this.dataSource.data = this.dataSource.data.slice(0, -1);
    this.table?.renderRows();
  }
}
