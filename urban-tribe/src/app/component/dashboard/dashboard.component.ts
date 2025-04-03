import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { UserListComponent } from '../user-list/user-list.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { AuthService } from '../../service/auth-service.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { UserService } from '../../service/user-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule
      ],
})
export class DashboardComponent implements OnInit {
  userForm!: FormGroup;
  selectedUser: any;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}
  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('female', [Validators.required]),
      status: new FormControl('active', [Validators.required])
    });
  }

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

  onSubmitUser(): void {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value).subscribe({
        next: (user) => console.log('Utente aggiunto:', user),
      });
      this.userForm.reset();
    }
  }
}

