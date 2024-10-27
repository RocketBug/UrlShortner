import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const shortUrlGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const shortUrl = route.paramMap.get('shortUrl');
  if (shortUrl && /^[A-Za-z0-9]{6}$/.test(shortUrl)) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
