import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { UserListComponent } from '../user-list/user-list.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { AuthService } from '../../service/auth-service.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    MatSidenavModule,
    MatListModule,
    CommonModule,
    UserListComponent,
    UserDetailComponent,
    MatButtonModule,
      ],
})
export class DashboardComponent {
  selectedUser: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  onUserSelected(user: any) {
    this.selectedUser = user;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  seePosts() {
    this.router.navigate(['/posts']);
  }
}

