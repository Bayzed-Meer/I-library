import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavItem, NavItemComponent } from '@shared';
import { ThemeService } from '@core';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    NavItemComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly themeService = inject(ThemeService);

  protected currentTheme = computed(() => this.themeService.appTheme());
  protected isSidenavOpen = signal(true);
  protected isMobileDevice = toSignal(
    this.breakpointObserver.observe('(max-width: 1024px)').pipe(
      map(result => {
        this.isSidenavOpen.set(!result.matches);
        return result.matches;
      })
    ),
    { initialValue: false }
  );

  protected navItems: NavItem[] = [
    { label: 'Profile', link: '/user/profile', icon: 'person', key: 'profile' },
    {
      label: 'Reservations',
      link: '/user/reservations',
      icon: 'bookmark',
      key: 'reservations',
    },
    {
      label: 'My Borrowings',
      icon: 'library_books',
      key: 'my-borrowings',
      children: [
        {
          label: 'Currently Borrowed',
          link: '/user/my-borrowings/currently-borrowed',
          icon: 'book',
          key: 'currently-borrowed',
        },
        {
          label: 'Borrowing History',
          link: '/user/my-borrowings/borrowing-history',
          icon: 'history',
          key: 'borrowing-history',
        },
        {
          label: 'Overdue Books & Fines',
          link: '/user/my-borrowings/overdue-books',
          icon: 'error',
          key: 'overdue-books',
        },
      ],
    },
    {
      label: 'My Library',
      icon: 'account_balance',
      key: 'my-library',
      children: [
        {
          label: 'Wish List',
          link: '/user/my-library/wishlist',
          icon: 'favorite',
          key: 'wishlist',
        },
        {
          label: 'Favorites',
          link: '/user/my-library/favorites',
          icon: 'star',
          key: 'favorites',
        },
      ],
    },
    {
      label: 'Chat',
      link: '/user/chat',
      icon: 'chat',
      key: 'chat',
    },
    {
      label: 'Settings',
      icon: 'settings',
      key: 'settings',
      children: [
        {
          label: 'Notifications & Preferences',
          link: '/user/settings/notifications-preferences',
          icon: 'notifications',
          key: 'notifications-preferences',
        },
        {
          label: 'Change Password',
          link: '/user/settings/change-password',
          icon: 'lock_reset',
          key: 'change-password',
        },
      ],
    },
    { label: 'Sign out', link: '/sign-out', icon: 'logout', key: 'sign-out' },
  ];

  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
