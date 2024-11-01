import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const roleGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  if (cookieService.check('USER_ROLE')) {
    return true;
  }else {
    router.navigate(['/dashboard/home']);
    return false;
  }
};
