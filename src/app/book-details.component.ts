import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { loader } from './book-details.loader';
import { Resolved } from './types';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <ng-container *ngIf="user$ | async as user">
      <ng-container *ngIf="user !== 'logged out'">
        <h1>{{ book.title }}</h1>
        <div style="display: flex; flex-flow: row nowrap; gap: 8px;">
          <a [routerLink]="['./', 'general']" routerLinkActive ariaCurrentWhenActive="page">General</a>
          <a *ngIf="book.isAdmin" [routerLink]="['./', 'admin']" routerLinkActive ariaCurrentWhenActive="page">Admin</a>
        </div>
        <router-outlet></router-outlet>
        <div>
          <a [routerLink]="['../', bookId + 1]">Try next book</a>
        </div>
      </ng-container>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-flow: column nowrap;
        align-items: flex-start;
        gap: 16px;
      }
      a {
        text-decoration: none;
        &[aria-current='page'] {
          text-decoration: underline;
        }
      }
    `,
  ],
})
export default class BookDetailsComponent {
  protected user$ = inject(AuthService).user$;

  @Input() book!: Resolved<typeof loader>;

  get bookId() {
    return Number(this.book.id);
  }
}
