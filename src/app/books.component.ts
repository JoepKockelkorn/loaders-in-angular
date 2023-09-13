import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksService, MinimalBook } from './books.service';
import { ResolveFn, RouterLink } from '@angular/router';
import { Resolved } from './types';

export const loader: ResolveFn<MinimalBook[]> = () =>
  inject(BooksService).getBooks();

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div *ngFor="let book of books" style="margin-bottom: 8px;">
      <a [routerLink]="['./', book.id]">{{ book.title }}</a>
    </div>
  `,
  styles: [],
})
export default class BooksComponent {
  @Input() books: Resolved<typeof loader> = [];
}
