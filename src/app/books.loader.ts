import { inject } from '@angular/core';
import { BooksService } from './books.service';
import { ResolveData } from '@angular/router';

export const loader = () => inject(BooksService).getBooks();

export const books = 'books';
export const booksResolve: ResolveData = { [books]: loader };
