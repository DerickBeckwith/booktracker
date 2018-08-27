import { Component, OnInit } from '@angular/core';

import { Reader } from 'app/models/reader';
import { DataService } from 'app/core/data.service';

@Component({
  selector: 'app-add-reader',
  templateUrl: './add-reader.component.html',
  styles: []
})
export class AddReaderComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit() {}

  saveReader(formValues: any): void {
    const newReader: Reader = <Reader>formValues;
    newReader.readerID = 0;
    console.log(newReader);
    this.dataService
      .addReader(newReader)
      .subscribe(
        (reader: Reader) => console.log('Added new Reader: ', reader),
        (error: any) => console.log(error)
      );
  }
}
