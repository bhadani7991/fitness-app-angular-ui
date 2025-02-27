import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  function isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return !!user;
  }

  // If user is logged in then allow otherwise redirect to /login
  if (isLoggedIn()) {
    return true;
  } else {
    return router.navigate(['/login']);
  }
};
