import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimations } from './route-animation';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
   
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [routeAnimations],
  template: `
    <main [@routeAnimations]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </main>
  `,
  
})
export class AppComponent {
 
  title = 'Urban-Tribe';
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}