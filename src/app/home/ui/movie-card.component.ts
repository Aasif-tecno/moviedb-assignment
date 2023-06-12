import {
  CommonModule,
  NgOptimizedImage,
  provideImgixLoader,
} from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, NgOptimizedImage],
  providers: [provideImgixLoader(environment.imagePath)],
  selector: 'app-movie-card',
  template: `
    <div class="item">
      <img
        [ngSrc]="movie.poster_path || ''"
        fill
        class="movie-poster"
        *ngIf="movie.poster_path; else placeHolder"
      />
      <ng-template #placeHolder>
        <img
          src="assets/img/movie-poster-placeholder.png"
          class="movie-poster"
        />
      </ng-template>
      <div class="rating">
        {{ +movie.vote_average | number : '1.1-1' }}
      </div>
      <div class="item-desc">
        <div class="info">
          <small>{{ movie.release_date | date : 'mediumDate' }}</small>
          <small> &#9733; {{ movie.popularity }} </small>
        </div>
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.overview }}</p>
      </div>
    </div>
  `,
})
export class MovieCardComponent {
  @Input() movie!: any;

  constructor() {}
}
