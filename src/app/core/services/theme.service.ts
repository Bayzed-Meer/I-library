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

  constructor() {
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

  setTheme(theme: Theme): void {
    this.appTheme.set(theme);
    this.storeTheme(theme);
  }

  themeInit(): void {
    const storedTheme = this.getStoredTheme();

    if (storedTheme) {
      this.appTheme.set(storedTheme);
    }

    this.listenSystemThemeChange();
  }

  private storeTheme(theme: Theme): void {
    window.localStorage.setItem('appTheme', theme);
  }

  private getStoredTheme(): Theme | null {
    return window.localStorage.getItem('appTheme') as Theme | null;
  }

  private listenSystemThemeChange(): void {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', this.handleSystemThemeChange.bind(this));
  }

  private handleSystemThemeChange(event: MediaQueryListEvent): void {
    if (this.appTheme() === 'system') {
      this.appTheme.set(event.matches ? 'dark' : 'light');
      this.storeTheme(event.matches ? 'dark' : 'light');
    }
  }
}
