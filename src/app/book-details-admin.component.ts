import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { loader as bookLoader } from './book-details.loader';
import { BooksService } from './books.service';
import { Resolved } from './types';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-details-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>The book is: {{ book.isAvailable ? 'available' : 'not available' }}</div>

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
  #router = inject(Router);

  @Input() book!: Resolved<typeof bookLoader>;

  async toggle() {
    const book = await this.#bookService.toggleAvailability(this.book.id);
    if (!book) return;

    this.#router.navigate([], { onSameUrlNavigation: 'reload' });
  }
}
