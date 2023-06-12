import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AppSettingsService } from './app-settings.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class MovieDBService {
  constructor(
    private http: HttpClient,
    private appSettingsService: AppSettingsService
  ) {}

  public getMovies(params: any): Observable<any> {
    let queryParams = this.appSettingsService.queryStringFormat(params);
    return this.http
      .get(
        `${params.query ? 'search' : 'discover'}/movie?${queryParams}`,
        httpOptions
      )
      .pipe(
        map((resp: any) => {
          return resp;
        })
      );
  }
}
