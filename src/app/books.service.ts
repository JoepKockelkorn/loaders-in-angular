import { Injectable } from '@angular/core';

export interface MinimalBook {
  id: string;
  title: string;
}

export interface Book extends MinimalBook {
  author: string;
  isAvailable: boolean;
  isAdmin?: boolean;
}

const books: Book[] = [
  { id: '1', title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', isAvailable: true },
  { id: '2', title: 'The Hobbit', author: 'J.R.R. Tolkien', isAvailable: true, isAdmin: true },
  { id: '3', title: 'The philosophers stone', author: 'J.K. Rowling', isAvailable: false },
  { id: '4', title: 'The chamber of secrets', author: 'J.K. Rowling', isAvailable: true, isAdmin: true },
];

// TODO: could use https://ngneat.github.io/query/ to prevent refetching and to invalidate cache when a book is updated

@Injectable({ providedIn: 'root' })
export class BooksService {
  books = localStorage.getItem('books') ? (JSON.parse(localStorage.getItem('books')!) as Book[]) : books;

  getBooks(): Promise<MinimalBook[]> {
    console.log('getBooks');
    return delayAsPromise(this.books.map(({ id, title }) => ({ id, title })));
  }

  getBook(id: string) {
    console.log('getBook', id);
    return delayAsPromise(this.books.find((book) => book.id === id));
  }

  toggleAvailability(id: string) {
    console.log('toggleAvailability', id);
    this.books = this.books.map((book) => (book.id === id ? { ...book, isAvailable: !book.isAvailable } : book));
    localStorage.setItem('books', JSON.stringify(this.books));
  }
}

function delayAsPromise<T>(value: T, delayInMs = 1000) {
  return new Promise<T>((resolve) => setTimeout(() => resolve(value), delayInMs));
}
