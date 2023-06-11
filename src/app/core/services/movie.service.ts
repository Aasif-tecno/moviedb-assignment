import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AppSettingsService } from './appSettings.service';
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
        `${params.query ? 'search' : 'discover'}/movie/?${queryParams}`,
        httpOptions
      )
      .pipe(
        map((resp: any) => {
          if (resp && resp.results && Array.isArray(resp.results)) {
            for (const item of resp.results) {
              item.poster_path = environment.imagePath + item.poster_path;
            }
          }
          return resp;
        })
      );
  }
}
