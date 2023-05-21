import {
  trigger,
  transition,
  style,
  animate,
  query,
  animateChild,
  group,
} from '@angular/animations';

export const fadeInWithDelay = trigger('fadeInWithDelay', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms {{ delay }}ms', style({ opacity: 1 })),
  ]),
]);

const leftAnimation = [
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
];

const rightAnimation = [
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
    query(':leave', [animate('500ms ease-in-out', style({ right: '100%' }))], {
      optional: true,
    }),
    query(':enter', [animate('500ms ease-in-out', style({ right: '0%' }))], {
      optional: true,
    }),
  ]),
];

// Create an array for all transitions from i => j where i < j
// Add more indices to the array to create more transitions
const possibleIndices = [-1, 0, 1, 2, 3];

const rightTransitions = possibleIndices.flatMap((i) =>
  possibleIndices
    .filter((j) => i < j)
    .map((j) => `${i} => ${j}`)
    .map((s) => transition(s, rightAnimation))
);
const leftTransitions = possibleIndices.flatMap((i) =>
  possibleIndices
    .filter((j) => i > j)
    .map((j) => `${i} => ${j}`)
    .map((s) => transition(s, leftAnimation))
);

const allTransitions = [...rightTransitions, ...leftTransitions];

export const slideAnimation = trigger('routeAnimations', allTransitions);
