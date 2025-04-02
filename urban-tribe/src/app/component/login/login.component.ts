import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../service/auth-service.service';
import { Router, RouterOutlet } from '@angular/router';
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
    MatFormFieldModule,
    RouterOutlet
  ],
})
export class LoginComponent {
  loginForm = new FormGroup({
    token: new FormControl('')
  });
  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const token = this.loginForm.get('token')?.value;
    if (!token) {
      alert('Inserisci un token valido');
      return;
    }
    if (this.authService.login(token)) {
      this.router.navigate(['/profile']);
    } else {
      alert('Token non valido');
    }
  }
}
