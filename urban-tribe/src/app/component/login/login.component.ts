import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../service/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule]
})
export class LoginComponent {
  loginForm = new FormGroup({
    token: new FormControl('')
  });
  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const token = this.loginForm.value.token ?? '';
    if (this.authService.validateToken(token)) {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Token non valido');
    }
  }
}
