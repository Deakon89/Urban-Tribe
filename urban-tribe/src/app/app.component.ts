import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimations } from './route-animation';
import { CommonModule } from '@angular/common';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { faGithub } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    // FontAwesomeModule,
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
  // faGithub = ['fab', 'github'];
  title = 'Urban-Tribe';
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}