import { Component, OnInit } from '@angular/core';

import { Book } from 'app/models/book';
import { DataService } from 'app/core/data.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styles: []
})
export class AddBookComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit() {}

  saveBook(formValues: any): void {
    const newBook: Book = <Book>formValues;
    newBook.bookID = 0;
    console.log(newBook);
    this.dataService
      .addBook(newBook)
      .subscribe(
        (book: Book) => console.log('Added new Book: ', book),
        (error: any) => console.log(error)
      );
  }
}
