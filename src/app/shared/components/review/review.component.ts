import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RatingStarsComponent } from '@shared';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-review',
  imports: [RatingStarsComponent, MatIconModule, MatButtonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewComponent {}
