import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-categories-section',
  imports: [RouterModule, MatChipsModule],
  templateUrl: './categories-section.component.html',
  styleUrl: './categories-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesSectionComponent {}
