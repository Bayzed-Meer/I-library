import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-unexpected-error',
  imports: [],
  templateUrl: './unexpected-error.component.html',
  styleUrl: './unexpected-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnexpectedErrorComponent {}
