import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileUpdateRequest, ProfileUpdateResponse } from '../models/Profile';
import { Observable } from 'rxjs';
import { BASE_URL } from '../utils/appConstant';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private readonly http: HttpClient) {}

  updateProfile(
    profileRequest: ProfileUpdateRequest
  ): Observable<ProfileUpdateResponse> {
    return this.http.put<ProfileUpdateResponse>(
      `${BASE_URL}/profile`,
      profileRequest,
      {
        withCredentials: true,
      }
    );
  }
}
