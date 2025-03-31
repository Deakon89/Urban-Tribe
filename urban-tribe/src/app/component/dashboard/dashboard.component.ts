import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { UserListComponent } from '../user-list/user-list.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    MatSidenavModule,
    MatListModule,
    CommonModule,
    UserListComponent,
    UserDetailComponent
      ],
})
export class DashboardComponent {
  selectedUser: any = null;

  onUserSelected(user: any) {
    this.selectedUser = user;
  }
}

