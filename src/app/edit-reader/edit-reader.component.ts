import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Reader } from 'app/models/reader';
import { DataService } from 'app/core/data.service';
import { BadgeService } from 'app/services/badge.service';

@Component({
  selector: 'app-edit-reader',
  templateUrl: './edit-reader.component.html',
  styles: [],
  providers: [BadgeService]
})
export class EditReaderComponent implements OnInit {
  selectedReader: Reader;
  currentBadge: string;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private badgeService: BadgeService
  ) {}

  ngOnInit() {
    const readerID: number = parseInt(this.route.snapshot.params['id'], 10);
    this.getReaderById(readerID);
    this.currentBadge = this.badgeService.getReaderBadge(this.selectedReader.totalMinutesRead);
  }

  getReaderById(id: number) {
    this.dataService
      .getReaderById(id)
      .subscribe(
        (reader: Reader) => (this.selectedReader = reader),
        (error: any) => console.log(error)
      );
  }

  saveChanges() {
    console.warn('Save reader not yet implemented.');
  }
}
