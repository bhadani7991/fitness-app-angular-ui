import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse, User } from '../models/LoginModel';
import { BASE_URL } from '../utils/appConstant';
import { log } from 'console';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor(private readonly http: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${BASE_URL}/login`, loginRequest, {
      withCredentials: true,
    });
  }
}
