import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { BookCardItemComponent } from '@shared';

@Component({
  selector: 'app-book-card',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    RouterModule,
    BookCardItemComponent,
  ],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCardComponent {}
