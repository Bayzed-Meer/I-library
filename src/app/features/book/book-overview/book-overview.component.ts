import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RatingStarsComponent } from '@shared';

@Component({
  selector: 'app-book-overview',
  imports: [MatButtonModule, MatIconModule, RatingStarsComponent],
  templateUrl: './book-overview.component.html',
  styleUrl: './book-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookOverviewComponent {}
