import { trigger, transition, style, animate } from '@angular/animations';

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
