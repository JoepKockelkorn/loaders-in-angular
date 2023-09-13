import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { BooksService } from './books.service';
import { loader as bookLoader } from './book-details.component';
import { loader as adminLoader } from './book-details-admin.component';
import { authGuard } from './auth.guard';

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
        runGuardsAndResolvers: (from, to) =>
          from.params['bookId'] !== to.params['bookId'], // rerun resolver if bookId changes, but not when the tab changes
        resolve: { book: bookLoader },
        children: [
          {
            path: 'general',
            loadComponent: () => import('./book-details-general.component'),
          },
          {
            path: 'admin',
            loadComponent: () => import('./book-details-admin.component'),
            resolve: { isAdmin: adminLoader },
          },
          { path: '', redirectTo: 'general', pathMatch: 'full' },
        ],
      },
    ],
  },
  { path: '404', loadComponent: () => import('./not-found.component') },
  { path: '**', redirectTo: '/404' },
];
