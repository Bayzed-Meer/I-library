import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BookCardItemComponent } from '@shared';

@Component({
  selector: 'app-reservations',
  imports: [BookCardItemComponent],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationsComponent {}
