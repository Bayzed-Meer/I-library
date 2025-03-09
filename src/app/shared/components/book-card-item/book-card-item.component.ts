import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-book-card-item',
  imports: [MatIconModule, MatButtonModule, RouterModule, MatChipsModule],
  templateUrl: './book-card-item.component.html',
  styleUrl: './book-card-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCardItemComponent {}
