import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoggerService } from './logger.service';

@Injectable()
export class LogResponseInterceptor implements HttpInterceptor {
  constructor(private logger: LoggerService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
          this.logger.log(event.body);
        }
      })
    );
  }
}
