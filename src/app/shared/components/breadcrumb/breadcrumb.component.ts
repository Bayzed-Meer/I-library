import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BreadcrumbItem } from '@shared';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterModule, MatIconModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  breadcrumbs = input.required<BreadcrumbItem[]>();
}
