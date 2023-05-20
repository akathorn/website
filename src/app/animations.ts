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

export const slideAnimation = trigger('routeAnimations', [
  transition('* => forward', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),
    query(':enter', [style({ right: '-100%' })], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(
        ':leave',
        [animate('500ms ease-in-out', style({ right: '100%' }))],
        {
          optional: true,
        }
      ),
      query(':enter', [animate('500ms ease-in-out', style({ right: '0%' }))], {
        optional: true,
      }),
    ]),
  ]),
  transition('* => backward', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),
    query(':enter', [style({ left: '-100%' })], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [animate('500ms ease-in-out', style({ left: '100%' }))], {
        optional: true,
      }),
      query(':enter', [animate('500ms ease-in-out', style({ left: '0%' }))], {
        optional: true,
      }),
    ]),
  ]),
]);
