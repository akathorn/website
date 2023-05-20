import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { slideAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideAnimation],
})
export class AppComponent implements OnInit {
  title = 'Daniel Codes';

  navigation: string = '';
  private lastPop: number = 0;
  private poppingDirection: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // TODO: go through this again
    // Maybe just give each page a "z-value" and animate based on that
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.id == 1) {
          this.navigation = localStorage.getItem('navigation') || '';
          this.lastPop = 100000;
          this.poppingDirection =
            localStorage.getItem('poppingDirection') || '';
          return;
        }

        if (event.navigationTrigger !== 'popstate') {
          this.navigation = 'forward';
          this.lastPop = 0;
          this.poppingDirection = '';
          localStorage.setItem('navigation', this.navigation);
          localStorage.setItem('poppingDirection', this.poppingDirection);
          return;
        }

        console.log(event);

        let currentPop = event.restoredState!.navigationId;
        if (!this.poppingDirection) {
          this.poppingDirection = 'backward';
        } else if (
          this.poppingDirection === 'backward' &&
          currentPop > this.lastPop
        ) {
          this.poppingDirection = 'forward';
        } else if (
          this.poppingDirection === 'forward' &&
          currentPop > this.lastPop
        ) {
          this.poppingDirection = 'backward';
        }
        this.lastPop = currentPop;
        this.navigation = this.poppingDirection;

        localStorage.setItem('navigation', this.navigation);
        localStorage.setItem('poppingDirection', this.poppingDirection);
      }
    });
  }

  resetAnimationState() {
    this.navigation = '';
  }
}
