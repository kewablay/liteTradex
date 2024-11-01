import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const adminGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const userRole = cookieService.get('USER_ROLE');
  if (userRole === 'ADMIN') {
    return true;
  } else {
    router.navigate(['/dashboard/home']);
    return false;
  }
};
