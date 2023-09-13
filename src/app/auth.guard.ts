import { inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  return inject(AuthService).user$.pipe(
    map((user) =>
      user === 'logged out'
        ? router.createUrlTree(['/', 'login'], {
            queryParams: { redirect: state.url },
          })
        : true
    )
  );
};
