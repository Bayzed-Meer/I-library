import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeService } from '@core';
import { RouterModule } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
  ],
})
export class NavbarComponent implements OnInit {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly destroyRef = inject(DestroyRef);
  private readonly themeService = inject(ThemeService);

  protected isMobileMenuVisible = signal(false);
  protected isMobileDevice = signal(false);
  protected currentTheme = computed(() => this.themeService.appTheme());

  ngOnInit(): void {
    this.breakpointObserver
      .observe('(max-width: 640px)')
      .pipe(
        tap(result => this.isMobileDevice.set(result.matches)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  protected toggleMobileMenu(): void {
    this.isMobileMenuVisible.set(!this.isMobileMenuVisible());
  }

  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
