import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { NavItem } from '@shared';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-item',
  imports: [MatIconModule, MatListModule, RouterModule],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavItemComponent implements OnInit {
  private readonly router = inject(Router);

  item = input.required<NavItem>();
  isNestedMenuOpen = signal(false);

  ngOnInit(): void {
    const shouldExpandNavItem = this.router.url.includes(
      this.item().key.toLowerCase()
    );
    this.isNestedMenuOpen.set(shouldExpandNavItem);
  }

  toggleNestedMenu(): void {
    if (!this.item()?.children) return;
    this.isNestedMenuOpen.set(!this.isNestedMenuOpen());
  }
}
