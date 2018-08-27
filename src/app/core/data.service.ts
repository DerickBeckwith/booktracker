import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { allBooks, allReaders } from 'app/data';
import { LoggerService } from './logger.service';
import { Reader } from 'app/models/reader';
import { Book } from 'app/models/book';
import { OldBook } from 'app/models/oldBook';
import { BookTrackerError } from 'app/models/bookTrackerError';

@Injectable()
export class DataService {
  mostPopularBook: Book = allBooks[0];

  constructor(private loggerService: LoggerService, private http: HttpClient) {}

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Reader[] {
    return allReaders;
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('/api/books');
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`/api/books/${id}`, {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'my-token'
      })
    });
  }

  getOldBookById(id: number): Observable<OldBook> {
    return this.http.get<Book>(`/api/books/${id}`).pipe(
      map(
        book =>
          <OldBook>{
            bookTitle: book.title,
            year: book.publicationYear
          }
      ),
      tap(classicBook => console.log(classicBook))
    );
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>('/api/books', book, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  updateBook(book: Book): Observable<void> {
    return this.http.put<void>(`/api/books/${book.bookID}`, book, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  deleteBookById(id: number): Observable<void> {
    return this.http.delete<void>(`/api/books/${id}`);
  }
}
