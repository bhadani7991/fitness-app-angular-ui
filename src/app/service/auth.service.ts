import { Injectable } from '@angular/core';
import { User } from '../models/LoginModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isUserLoggedIn() {
    if (typeof window !== 'undefined')
      return localStorage.getItem('user') !== null;
    return false;
  }

  logIn(userId: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', userId);
    }
  }

  logOut() {
    if (typeof window !== 'undefined') localStorage.removeItem('user');
  }
}
