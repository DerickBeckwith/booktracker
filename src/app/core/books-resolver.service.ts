import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Book } from '../models/book';
import { DataService } from '../core/data.service';
import { BookTrackerError } from '../models/bookTrackerError';

@Injectable()
export class BooksResolverService implements Resolve<Book[] | BookTrackerError> {
  constructor(private dataService: DataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Book[] | BookTrackerError> {
    return this.dataService.getAllBooks().pipe(catchError(error => of(error)));
  }
}
