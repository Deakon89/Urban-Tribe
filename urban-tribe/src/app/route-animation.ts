import {
    trigger,
    transition,
    style,
    query,
    group,
    animate,
  } from '@angular/animations';
  
  export const routeAnimations = trigger('routeAnimations', [
    transition('* <=> *', [
      
      query(':enter, :leave', [
        style({
          position: 'absolute',
          width: '100%',
          top: 70,
          left: 38,
        })
      ], { optional: true }),
  
    
      query(':enter', [
        style({
          transform: 'translateX(100%)',
          opacity: 0
        })
      ], { optional: true }),
  
      
      group([
        query(':leave', [
          animate('300ms ease', style({
            transform: 'translateX(-30%)',
            opacity: 0
          }))
        ], { optional: true }),
        query(':enter', [
          animate('1000ms ease', style({
            transform: 'translateX(0)',
            opacity: 1
          }))
        ], { optional: true })
      ])
    ])
  ]);
  