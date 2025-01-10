import { Injectable, computed, effect, signal } from '@angular/core';

type Theme = 'light' | 'dark' | 'system';

export interface AppTheme {
  name: Theme;
  icon: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly appTheme = signal<Theme>('system');
  private readonly themes: AppTheme[] = [
    { name: 'light', icon: 'light_mode' },
    { name: 'dark', icon: 'dark_mode' },
    { name: 'system', icon: 'desktop_windows' },
  ];
  private readonly systemTheme = window.matchMedia(
    '(prefers-color-scheme: dark)'
  );

  constructor() {
    this.applySystemThemeChange();

    effect(() => {
      const appTheme = this.appTheme();
      const isDarkMode =
        appTheme === 'dark' ||
        (appTheme === 'system' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);

      document.body.style.setProperty(
        'color-scheme',
        appTheme === 'system' ? 'light dark' : appTheme
      );
      document.body.classList.toggle('dark', isDarkMode);
    });
  }

  selectedTheme = computed(() =>
    this.themes.find((theme: AppTheme) => theme.name === this.appTheme())
  );

  getThemes(): AppTheme[] {
    return this.themes;
  }

  setTheme(theme: 'light' | 'dark' | 'system'): void {
    this.appTheme.set(theme);
  }

  private applySystemThemeChange(): void {
    this.systemTheme.addEventListener(
      'change',
      this.handleSystemThemeChange.bind(this)
    );
  }

  private handleSystemThemeChange(event: MediaQueryListEvent): void {
    if (this.appTheme() === 'system') {
      this.appTheme.set(event.matches ? 'dark' : 'light');
    }
  }
}
