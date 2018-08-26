import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from 'app/models/book';
import { DataService } from 'app/core/data.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styles: []
})
export class EditBookComponent implements OnInit {
  selectedBook: Book;

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    const bookID: number = parseInt(this.route.snapshot.params['id'], 10);
    this.getBookById(bookID);
  }

  getBookById(id: number) {
    this.dataService.getBookById(id)
    .subscribe(
      (data: Book) => (this.selectedBook = data),
      (error: any) => console.log(error)
    );
  }

  setMostPopular(): void {
    this.dataService.setMostPopularBook(this.selectedBook);
  }

  saveChanges(): void {
    console.warn('Save changes to book not yet implemented.');
  }
}
