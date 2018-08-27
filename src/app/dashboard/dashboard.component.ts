import { Component, OnInit, VERSION } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Book } from 'app/models/book';
import { Reader } from 'app/models/reader';
import { DataService } from 'app/core/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private dataService: DataService, private title: Title) {}

  ngOnInit() {
    this.getAllBooks();
    this.getAllReaders();
    this.mostPopularBook = this.dataService.mostPopularBook;
    this.title.setTitle(`Book Tracker ${VERSION.full}`);
  }

  private getAllBooks() {
    this.dataService
      .getAllBooks()
      .subscribe(
        (books: Book[]) => (this.allBooks = books),
        (error: any) => console.log(error)
      );
  }

  private getAllReaders() {
    this.dataService
      .getAllReaders()
      .subscribe(
        (readers: Reader[]) => (this.allReaders = readers),
        (error: any) => console.log(error)
      );
  }

  deleteBook(bookID: number): void {
    this.dataService.deleteBookById(bookID).subscribe(
      () => {
        const index: number = this.allBooks.findIndex(book => book.bookID === bookID);
        const title: string = this.allBooks[index].title;
        this.allBooks.splice(index, 1);
        console.log(`${title} was deleted sucessfully.`);
      },
      (error: any) => console.log(error)
    );
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }
}
