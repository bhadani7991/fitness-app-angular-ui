import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { WorkoutModelComponent } from './workout-model/workout-model.component';
import { WorkoutTrendChartComponent } from './workout-trend-chart/workout-trend-chart.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../../models/LoginModel';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-workout',
  imports: [
    MatCardModule,
    MatButtonModule,
    WorkoutModelComponent,
    WorkoutTrendChartComponent,
    CommonModule,
  ],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.css',
})
export class WorkoutComponent {
  activeTab: string = 'tab1';
  user$: Observable<User>;

  constructor(private readonly store: Store<{ user: User }>) {
    this.user$ = store.select('user');
    this.user$.subscribe((value) => console.log(value));
  }

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }
}
