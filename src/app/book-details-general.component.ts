import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from './books.service';

@Component({
  selector: 'app-book-details-general',
  standalone: true,
  imports: [CommonModule],
  template: `Written by: {{ book.author }}`,
  styles: [],
})
export default class BookDetailsGeneralComponent {
  @Input() book!: Book;
}
