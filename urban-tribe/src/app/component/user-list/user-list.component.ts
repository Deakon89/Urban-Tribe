import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../service/user-service.service';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [MatListModule, MatIconModule, CommonModule, FormsModule],
})
export class UserListComponent {
  @Output() userSelected = new EventEmitter<any>();
  users: any[] = [];
  pageSize: number = 10;

  constructor(private userService: UserService) {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pageSize).subscribe(users => this.users = users);
  }

  selectUser(user: any) {
    this.userSelected.emit(user);
  }
}

