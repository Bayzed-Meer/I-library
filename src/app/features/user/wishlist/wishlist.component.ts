import { Component } from '@angular/core';
import { BookCardItemComponent } from '@shared';

@Component({
  selector: 'app-wishlist',
  imports: [BookCardItemComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {}
