import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinimalBook } from './books.service';
import { RouterLink } from '@angular/router';

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
  @Input() books: MinimalBook[] = [];
}
