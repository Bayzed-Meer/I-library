import { Component, computed, inject } from '@angular/core';
import { ThemeService } from '@core';

@Component({
  selector: 'app-banner-section',
  imports: [],
  templateUrl: './banner-section.component.html',
  styleUrl: './banner-section.component.scss',
})
export class BannerSectionComponent {
  private readonly themeService = inject(ThemeService);

  protected appTheme = computed(() => this.themeService.appTheme());
}
