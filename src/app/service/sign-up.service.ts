import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupRequest } from '../models/SignUpModel';
import { BASE_URL } from '../utils/appConstant';
import { Observable } from 'rxjs';
import { AuthResponse, User } from '../models/LoginModel';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(private readonly http: HttpClient) {}

  handleSignUpRequest(signUpRequest: SignupRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${BASE_URL}/signup`, signUpRequest, {
      withCredentials: true,
    });
  }
}
