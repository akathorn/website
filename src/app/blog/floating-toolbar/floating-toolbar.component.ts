import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-floating-toolbar',
  templateUrl: './floating-toolbar.component.html',
  styleUrls: ['./floating-toolbar.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state(
        'open',
        style({
          transform: 'translateX(-50%)',
        })
      ),
      state(
        'closed',
        style({
          transform: 'translateY(-200%) translateX(-50%)',
        })
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s')]),
    ]),
  ],
})
export class FloatingToolbarComponent implements OnInit, OnDestroy {
  hideToolbar = true;
  lastScrollTop = 0;

  constructor() {}

  ngOnInit(): void {
    console.log('Init');
    this.hideToolbar = false;
  }

  ngOnDestroy(): void {
    console.log('destroy');
    this.hideToolbar = true;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    this.hideToolbar = currentScrollTop > this.lastScrollTop;
    this.lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  }
}
