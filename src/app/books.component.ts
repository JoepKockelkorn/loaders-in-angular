import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Resolved } from './types';
import { books, loader } from './books.loader';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div *ngFor="let book of books" class="book">
      <a [routerLink]="['./', book.id]">{{ book.title }}</a>
    </div>
  `,
  styles: [
    `
      .book {
        margin-bottom: 8px;
      }
    `,
  ],
})
export default class BooksComponent {
  @Input(books) books: Resolved<typeof loader> = [];
}
