import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { TagsService } from '../services/blog/tags.service';

const openStyle = style({
  transform: 'translateY(0%) translateX(-50%)',
});

const closedStyle = style({
  transform: 'translateY(-200%) translateX(-50%)',
});

@Component({
  selector: 'app-floating-toolbar',
  templateUrl: './floating-toolbar.component.html',
  styleUrls: ['./floating-toolbar.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', openStyle),
      state('closed', closedStyle),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s 0.1s')]),
    ]),
  ],
})
export class FloatingToolbarComponent implements OnInit, OnDestroy {
  showToolbar = false;
  lastScrollTop = 0;
  tags$ = this.tagsService.tags$;

  constructor(private tagsService: TagsService) {}

  ngOnInit(): void {
    console.log('Init');
    setTimeout(() => {
      this.showToolbar = true;
    }, 200);
  }

  ngOnDestroy(): void {
    console.log('destroy');
    this.showToolbar = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    this.showToolbar = currentScrollTop <= this.lastScrollTop;
    this.lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  }
}
