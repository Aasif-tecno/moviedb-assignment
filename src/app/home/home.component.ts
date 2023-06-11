import { Component, effect, inject, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieCardComponent } from './ui/movie-card.component';
import NavComponent from './ui/nav.component';
import { CommonModule } from '@angular/common';
import { MovieDBService } from '../core/services/movie.service';
import { InfiniteScrollComponent } from '../shared/infinit.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MovieCardComponent,
    InfiniteScrollComponent,
    NavComponent,
  ],
  template: `
    <app-nav />
    <section class="movie-section">
      <header>
        <h2 class="section-title">Populer Movies</h2>
        <input class="search__input" type="text" placeholder="Search" />
      </header>
      <div class="divider"></div>
      <infinite-scroll (scrolled)="onScroll()">
        <div class="movie-list">
          <app-movie-card *ngFor="let movie of movieList" [movie]="movie" />
        </div>
      </infinite-scroll>
    </section>
  `,

  selector: 'app-home',
})
export default class HomeComponent {
  movieService = inject(MovieDBService);
  movieList: any = [];
  pageIndex = 1;

  constructor() {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    const params = { query: '', page: this.pageIndex, sort: '' };
    this.movieService.getMovies(params).subscribe((resp) => {
      console.log('movies', resp);
      this.movieList = [...this.movieList, ...resp.results];
    });
  }
  onScroll() {
    this.pageIndex++;
    this.loadProducts();
  }
}
