import { Injectable, signal } from '@angular/core';
import { Theme } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  appTheme = signal<Theme>('dark');

  themeInit(): void {
    const isDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (isDarkMode) {
      document.body.classList.add('dark');
    }

    const theme = isDarkMode ? 'dark' : 'light';
    this.setTheme(theme);

    this.listenSystemThemeChange();
  }

  toggleTheme(): void {
    const theme = this.appTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(theme);
  }

  private setTheme(theme: Theme): void {
    this.appTheme.set(theme);

    if (this.appTheme() === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  private listenSystemThemeChange(): void {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', this.handleSystemThemeChange.bind(this));
  }

  private handleSystemThemeChange(event: MediaQueryListEvent): void {
    const theme = event.matches ? 'dark' : 'light';
    this.setTheme(theme);
  }
}
