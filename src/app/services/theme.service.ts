import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public readonly currentTheme$ = new BehaviorSubject<Theme>('light');

  constructor(@Inject(DOCUMENT) private document: Document) {
    const osPrefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme') as Theme;
    const theme = savedTheme || (osPrefersDark ? 'dark' : 'light');
    this.currentTheme$.next(theme);
    this.setTheme(theme);

    console.log('OS prefers dark mode:', osPrefersDark);
    console.log('Selected theme:', theme);
  }

  public setTheme(theme: Theme): void {
    localStorage.setItem('theme', theme);
    this.currentTheme$.next(theme);

    if (theme === 'light') {
      console.log('Setting light theme');
      this.document.body.style.setProperty(
        '--background-color',
        'var(--light-background)'
      );
      this.document.body.style.setProperty('--text-color', 'var(--light-text)');
    } else {
      console.log('Setting dark theme');
      this.document.body.style.setProperty(
        '--background-color',
        'var(--dark-background)'
      );
      this.document.body.style.setProperty('--text-color', 'var(--dark-text)');
    }
  }

  public toggleTheme(): void {
    const theme = this.currentTheme$.getValue() === 'light' ? 'dark' : 'light';
    this.setTheme(theme);
  }
}
