import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book, BooksService } from './books.service';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { filter, map, of } from 'rxjs';
import { Resolved } from './types';
import { loader as bookLoader } from './book-details.component';

export const loader: ResolveFn<boolean> = (route: ActivatedRouteSnapshot) => {
  return of(route.parent?.data).pipe(
    map(
      (data) => (data!['book'] as Resolved<typeof bookLoader>).isAdmin ?? false
    ),
    filter(Boolean)
  );
};

@Component({
  selector: 'app-book-details-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      The book is: {{ book.isAvailable ? 'available' : 'not available' }}
    </div>

    <button (click)="toggle()">Toggle availability</button>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-flow: column nowrap;
        align-items: flex-start;
        gap: 8px;
      }
    `,
  ],
})
export default class BookDetailsAdminComponent {
  #bookService = inject(BooksService);

  @Input() book!: Resolved<typeof bookLoader>;

  async toggle() {
    const book = await this.#bookService.toggleAvailability(this.book.id);
    if (!book) return;

    this.book = book;
  }
}
