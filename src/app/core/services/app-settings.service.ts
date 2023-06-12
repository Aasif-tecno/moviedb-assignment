import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  constructor(private http: HttpClient) {}

  public queryStringFormat(queryParams: any) {
    console.log('queryStringFormat', queryParams);

    let queryString = Object.keys(queryParams)
      .map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(queryParams[k]);
      })
      .join('&');

    return queryString;
  }
}
