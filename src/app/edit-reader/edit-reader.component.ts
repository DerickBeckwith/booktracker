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
  }

  getReaderById(id: number) {
    this.dataService.getReaderById(id).subscribe(
      (reader: Reader) => {
        this.selectedReader = reader;
        this.currentBadge = this.getCurrentBadge(this.selectedReader);
      },
      (error: any) => console.log(error)
    );
  }

  getCurrentBadge(reader: Reader): string {
    return this.badgeService.getReaderBadge(reader.totalMinutesRead);
  }

  saveChanges() {
    this.dataService.updateReader(this.selectedReader).subscribe(
      () => {
        console.log(`${this.selectedReader.name} updated sucessfully.`);
        this.currentBadge = this.getCurrentBadge(this.selectedReader);
      },
      (error: any) => console.log(error)
    );
  }
}
