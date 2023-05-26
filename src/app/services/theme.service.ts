import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';
const themeVariables = [
  'background-color',
  'text-color',
  'shadow-color',
  'border-color',
  'toolbar-background-color',
  'subtitle-color',
  'date-color',
  'tag-background-color',
  'highlight-color',
];

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

    setTimeout(() => {
      this.setTheme(theme);
    }, 100);
  }

  public setTheme(theme: Theme): void {
    localStorage.setItem('theme', theme);
    this.currentTheme$.next(theme);

    for (let variable of themeVariables) {
      this.document.body.style.setProperty(
        `--${variable}`,
        `var(--${theme}-${variable})`
      );
    }
  }

  public toggleTheme(): void {
    const theme = this.currentTheme$.getValue() === 'light' ? 'dark' : 'light';
    this.setTheme(theme);
  }
}
