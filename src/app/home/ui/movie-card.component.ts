import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Checklist } from 'src/app/shared/interfaces/checklist';

@Component({
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  selector: 'app-movie-card',
  template: `
    <div
      class="item"
      [ngStyle]="{ 'background-image': 'url(' + movie.poster_path + ')' }"
    >
      <div class="rating">
        {{ movie.vote_average }}
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

  trackByFn(index: number, checklist: Checklist) {
    return checklist.id;
  }
}
