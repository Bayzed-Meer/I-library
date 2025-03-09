import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RatingStarsComponent, ReviewComponent } from '@shared';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-book-reviews',
  imports: [
    ReviewComponent,
    MatButtonModule,
    MatIconModule,
    RatingStarsComponent,
  ],
  templateUrl: './book-reviews.component.html',
  styleUrl: './book-reviews.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookReviewsComponent {}
