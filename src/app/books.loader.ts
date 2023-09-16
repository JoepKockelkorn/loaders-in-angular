import { inject } from '@angular/core';
import { BooksService } from './books.service';

export const loader = () => inject(BooksService).getBooks();
