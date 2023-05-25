import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { TagsService } from '../blog/services/tags.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-floating-toolbar',
  templateUrl: './floating-toolbar.component.html',
  styleUrls: ['./floating-toolbar.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          transform: 'translateY(0%) translateX(-50%)',
        })
      ),
      state(
        'closed',
        style({
          transform: 'translateY(-200%) translateX(-50%)',
        })
      ),
      transition('closed <=> open', [animate('0.2s 0.1s')]),
    ]),
  ],
})
export class FloatingToolbarComponent {
  toolbarState = 'closed';
  lastScrollTop = 0;
  tags$ = this.tagsService.tags$;
  theme$ = this.themeService.currentTheme$;

  constructor(
    private tagsService: TagsService,
    private themeService: ThemeService
  ) {
    setTimeout(() => {
      this.toolbarState = 'open';
    }, 200);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Make the toolbar disappear/reappear as the user scrolls
    const currentScrollTop =
      window.scrollY || document.documentElement.scrollTop;
    this.toolbarState =
      currentScrollTop <= this.lastScrollTop ? 'open' : 'closed';
    this.lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
