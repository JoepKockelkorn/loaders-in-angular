import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home.component'),
  },
  { path: 'login', loadComponent: () => import('./login.component') },
  {
    path: '',
    canActivate: [
      (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
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
      },
    ],
    children: [
      { path: 'books', loadComponent: () => import('./books.component') },
      {
        path: 'books/:bookId',
        loadComponent: () => import('./book-details.component'),
        children: [
          {
            path: 'general',
            loadComponent: () => import('./book-details-general.component'),
          },
          {
            path: 'admin',
            loadComponent: () => import('./book-details-admin.component'),
          },
          { path: '', redirectTo: 'general', pathMatch: 'full' },
        ],
      },
    ],
  },
  { path: '404', loadComponent: () => import('./not-found.component') },
  { path: '**', redirectTo: '/404' },
];
