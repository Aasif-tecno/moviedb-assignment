import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  private baseURL = environment.apiUrl;
  /**
   * Constructor
   */
  @Injectable()
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newParams = new HttpParams({ fromString: req.params.toString() });
    let baseUrl = this.baseURL;
    if (req.url.indexOf('http://') === 0 || req.url.indexOf('https://') === 0) {
      baseUrl = '';
    }

    if (req.url.indexOf('assets/icons') !== -1) {
      baseUrl = location.origin + '/';
    }
    newParams = newParams.append('api_key', environment.apiKey);

    const requestClone = req.clone({
      url: baseUrl + req.url,
      params: newParams,
    });
    return next.handle(requestClone);
  }
}
