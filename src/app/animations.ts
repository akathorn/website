import {
  trigger,
  transition,
  style,
  animate,
  query,
  animateChild,
  group,
} from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms', style({ opacity: 1 })),
  ]),
]);

export const fadeInWithDelay = trigger('fadeInWithDelay', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms {{ delay }}ms', style({ opacity: 1 })),
  ]),
]);

export const slideInAnimation = trigger('routeAnimations', [
  transition('main <=> blog', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '-100%' })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('500ms ease-in-out', style({ left: '100%' }))]),
      query(':enter', [animate('500ms ease-in-out', style({ left: '0%' }))]),
    ]),
  ]),
]);
