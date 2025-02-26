import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/LoginModel';
import { BASE_URL } from '../utils/appConstant';

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
