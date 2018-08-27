import { Component, OnInit, VERSION } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Book } from 'app/models/book';
import { Reader } from 'app/models/reader';
import { DataService } from 'app/core/data.service';
import { BookTrackerError } from 'app/models/bookTrackerError';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(
    private dataService: DataService,
    private title: Title,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getAllBooks();
    this.getAllReaders();
    this.mostPopularBook = this.dataService.mostPopularBook;
    this.title.setTitle(`Book Tracker ${VERSION.full}`);
  }

  private getAllBooks() {
    const resolvedData: Book[] | BookTrackerError = this.route.snapshot.data['resolvedBooks'];
    if (resolvedData instanceof BookTrackerError) {
      console.log(`Dashboard component error: ${resolvedData.friendlyMessage}`);
    } else {
      this.allBooks = resolvedData;
    }
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
    this.dataService.deleteReaderById(readerID).subscribe(
      () => {
        const index: number = this.allReaders.findIndex(reader => reader.readerID === readerID);
        const name: string = this.allReaders[index].name;
        this.allReaders.splice(index, 1);
        console.log(`${name} was deleted sucessfully.`);
      },
      (error: any) => console.log(error)
    );
  }
}
