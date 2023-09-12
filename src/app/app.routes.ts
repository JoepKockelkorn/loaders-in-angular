import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { AuthService } from './auth.service';
import { filter, map, of } from 'rxjs';
import { BooksService } from './books.service';

const authGuard: CanActivateFn = (
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

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home.component'),
  },
  { path: 'login', loadComponent: () => import('./login.component') },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'books',
        loadComponent: () => import('./books.component'),
        resolve: { books: () => inject(BooksService).getBooks() },
      },
      {
        path: 'books/:bookId',
        loadComponent: () => import('./book-details.component'),
        resolve: {
          book: (route: ActivatedRouteSnapshot) => {
            const bookId = route.paramMap.get('bookId');
            return of(inject(BooksService).getBook(bookId!)).pipe(
              filter(Boolean)
            );
          },
        },
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
