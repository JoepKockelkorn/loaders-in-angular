import { inject } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { filter, from } from 'rxjs';
import { BooksService } from './books.service';

export const loader = (route: ActivatedRouteSnapshot) => {
  const bookId = route.paramMap.get('bookId');
  return from(inject(BooksService).getBook(bookId!)).pipe(filter(Boolean));
};
