import { Component } from '@angular/core';
import { BookCardItemComponent } from '@shared';

@Component({
  selector: 'app-favorites',
  imports: [BookCardItemComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {}
