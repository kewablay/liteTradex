import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  if (cookieService.check('AUTH_TOKEN')) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
