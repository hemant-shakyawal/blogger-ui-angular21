import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from '../../services/authservice';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(Authservice);
  const router = inject(Router);
  const user = authService.user();
  if (!user) {
    // returnback to login page
    router.navigate(['/login']);

    return false;
  }

  // when user is login

  const isWriter = user.roles.includes('Reader');
  if (!isWriter) {
    // returnback to login page
    router.navigate(['/login']);
    return false;
  }
  // when user is login and have writer role
  return true;


};
