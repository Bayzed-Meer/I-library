import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeService } from '@core';
import { RouterModule } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';

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
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDivider,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly themeService = inject(ThemeService);

  protected currentTheme = computed(() => this.themeService.appTheme());
  protected isMobileMenuVisible = signal(false);
  protected isMobileDevice = toSignal(
    this.breakpointObserver
      .observe('(max-width: 640px)')
      .pipe(map(result => result.matches)),
    { initialValue: false }
  );

  protected toggleMobileMenu(): void {
    this.isMobileMenuVisible.set(!this.isMobileMenuVisible());
  }

  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  protected readonly screenLeft = screenLeft;
}
