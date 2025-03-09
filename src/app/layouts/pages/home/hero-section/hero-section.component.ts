import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ThemeService } from '@core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-hero-section',
  imports: [RouterModule, MatButtonModule, MatIconModule, MatFormFieldModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  private readonly themeService = inject(ThemeService);

  protected appTheme = computed(() => this.themeService.appTheme());
}
