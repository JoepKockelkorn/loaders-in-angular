import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>list of data, filters, pagination, etc</p> `,
  styles: [],
})
export default class BooksComponent {}
