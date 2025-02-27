import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../utils/appConstant';
import { Observable } from 'rxjs';
import {
  WorkoutAddResponse,
  WorkoutRequest,
  WorkoutResponse,
} from '../models/Workout';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  constructor(private readonly http: HttpClient) {}

  fetchWorkoutDetails(): Observable<WorkoutResponse> {
    return this.http.get<WorkoutResponse>(`${BASE_URL}/workouts`, {
      withCredentials: true,
    });
  }

  addWorkoutDetails(
    workoutRequest: WorkoutRequest
  ): Observable<WorkoutAddResponse> {
    const workout = [workoutRequest];
    return this.http.post<WorkoutAddResponse>(`${BASE_URL}/workouts`, workout, {
      withCredentials: true,
    });
  }
}
