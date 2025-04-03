import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private router: Router, private authService: AuthService) {}
  
  // example data
  user = {
    username: 'Admin',
    bio: 'Frontend Developer | Angular Enthusiast 🚀',
    email: 'Start2Impact@example.com',
    location: 'Rieti, Italia',
    avatarUrl: 'https://i.pravatar.cc/300' 
  };

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']); 
  }
}
