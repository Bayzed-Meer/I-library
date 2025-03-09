import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-page-not-found-error',
  imports: [RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './page-not-found-error.component.html',
  styleUrl: './page-not-found-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundErrorComponent {}
