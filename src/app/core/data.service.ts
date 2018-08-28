import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { allBooks } from 'app/data';
import { Reader } from 'app/models/reader';
import { Book } from 'app/models/book';
import { OldBook } from 'app/models/oldBook';
import { BookTrackerError } from 'app/models/bookTrackerError';

@Injectable()
export class DataService {
  mostPopularBook: Book = allBooks[0];

  constructor(private http: HttpClient) {}

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Observable<Reader[]> {
    return this.http.get<Reader[]>('/api/readers');
  }

  getReaderById(id: number): Observable<Reader> {
    return this.http.get<Reader>(`/api/readers/${id}`);
  }

  getAllBooks(): Observable<Book[] | BookTrackerError> {
    return this.http
      .get<Book[]>('/api/books')
      .pipe(catchError(error => this.handleHttpError(error)));
  }

  private handleHttpError(error: HttpErrorResponse): Observable<BookTrackerError> {
    const dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data.';
    return throwError(dataError);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`/api/books/${id}`);
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
    return this.http.post<Book>('/api/books', book);
  }

  updateBook(book: Book): Observable<void> {
    return this.http.put<void>(`/api/books/${book.bookID}`, book);
  }

  deleteBookById(id: number): Observable<void> {
    return this.http.delete<void>(`/api/books/${id}`);
  }

  addReader(reader: Reader): Observable<Reader> {
    return this.http.post<Reader>('/api/readers', reader);
  }

  updateReader(reader: Reader): Observable<void> {
    return this.http.put<void>(`/api/readers/${reader.readerID}`, reader);
  }

  deleteReaderById(id: number): Observable<void> {
    return this.http.delete<void>(`/api/readers/${id}`);
  }
}
