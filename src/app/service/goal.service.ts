import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../utils/appConstant';
import { Observable } from 'rxjs';
import { GoalResponse } from '../models/Goal';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  constructor(private readonly http: HttpClient) {}

  fetchActiveGoal(): Observable<GoalResponse> {
    return this.http.get<GoalResponse>(`${BASE_URL}/active/goal`, {
      withCredentials: true,
    });
  }
}
