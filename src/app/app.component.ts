import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { slideAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideAnimation],
})
export class AppComponent {
  title = 'Daniel Codes';

  navigation: string = '';
  currentNavigationX = '-1';

  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animationX'
    ];
  }

  resetAnimationState() {
    this.navigation = '';
  }
}
