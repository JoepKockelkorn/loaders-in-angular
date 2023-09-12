import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Book } from './books.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <h1>{{ book.title }}</h1>
    <div style="display: flex; flex-flow: row nowrap; gap: 8px;">
      <a
        [routerLink]="['./', 'general']"
        routerLinkActive
        ariaCurrentWhenActive="page"
        >General</a
      >
      <a
        [routerLink]="['./', 'admin']"
        routerLinkActive
        ariaCurrentWhenActive="page"
        >Admin</a
      >
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
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
  @Input() book!: Book;
}
