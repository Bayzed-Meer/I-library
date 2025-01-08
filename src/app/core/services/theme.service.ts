import { Injectable, computed, effect, signal } from '@angular/core';

export interface AppTheme {
  name: 'light' | 'dark' | 'system';
  icon: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private appTheme = signal<'light' | 'dark' | 'system'>('system');

  private themes: AppTheme[] = [
    { name: 'light', icon: 'light_mode' },
    { name: 'dark', icon: 'dark_mode' },
    { name: 'system', icon: 'desktop_windows' },
  ];

  constructor() {
    effect(() => {
      const appTheme = this.appTheme();
      const colorScheme = appTheme === 'system' ? 'light dark' : appTheme;
      document.body.style.setProperty('color-scheme', colorScheme);
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
}
