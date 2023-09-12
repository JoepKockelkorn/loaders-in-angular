import { Injectable } from '@angular/core';

export interface MinimalBook {
  id: string;
  title: string;
}

export interface Book extends MinimalBook {
  author: string;
  isAvailable: boolean;
}

const books: Book[] = [
  {
    id: '1',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    isAvailable: true,
  },
  {
    id: '2',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isAvailable: true,
  },
  {
    id: '3',
    title: 'The philosophers stone',
    author: 'J.K. Rowling',
    isAvailable: false,
  },
  {
    id: '4',
    title: 'The chamber of secrets',
    author: 'J.K. Rowling',
    isAvailable: true,
  },
];

@Injectable({ providedIn: 'root' })
export class BooksService {
  getBooks(): MinimalBook[] {
    return books.map(({ id, title }) => ({ id, title }));
  }

  getBook(id: string) {
    return books.find((book) => book.id === id);
  }
}
