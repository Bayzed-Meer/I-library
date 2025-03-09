import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-notifications-preferences',
  imports: [MatSlideToggleModule],
  templateUrl: './notifications-preferences.component.html',
  styleUrl: './notifications-preferences.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsPreferencesComponent {}
