import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { loader as adminLoader } from './book-details-admin.component';
import { loader as bookLoader } from './book-details.component';
import { loader as booksLoader } from './books.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', loadComponent: () => import('./home.component') },
  { path: 'login', loadComponent: () => import('./login.component') },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'books', loadComponent: () => import('./books.component'), resolve: { books: booksLoader } },
      {
        path: 'books/:bookId',
        loadComponent: () => import('./book-details.component'),
        // otherwise the resolver is not called when navigating from one book to another or when switching between general and admin tabs
        runGuardsAndResolvers: 'always',
        resolve: { book: bookLoader },
        children: [
          { path: 'general', loadComponent: () => import('./book-details-general.component') },
          { path: 'admin', loadComponent: () => import('./book-details-admin.component'), resolve: { isAdmin: adminLoader } },
          { path: '', redirectTo: 'general', pathMatch: 'full' },
        ],
      },
    ],
  },
  { path: '404', loadComponent: () => import('./not-found.component') },
  { path: '**', redirectTo: '/404' },
];
