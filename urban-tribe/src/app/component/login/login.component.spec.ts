import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../service/auth-service.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        LoginComponent  // Utilizza il componente come standalone
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Ottieni le istanze dei servizi dal injector
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "/profile" when login is successful', () => {
    spyOn(authService, 'login').and.returnValue(true);
    spyOn(router, 'navigate');

    component.loginForm.controls['token'].setValue('valid-token');
    component.onLogin();

    expect(authService.login).toHaveBeenCalledWith('valid-token');
    expect(router.navigate).toHaveBeenCalledWith(['/profile']);
  });

  it('should not navigate when token is invalid', () => {
    spyOn(authService, 'login').and.returnValue(false);
    spyOn(window, 'alert');
    spyOn(router, 'navigate');

    component.loginForm.controls['token'].setValue('invalid-token');
    component.onLogin();

    expect(authService.login).toHaveBeenCalledWith('invalid-token');
    expect(router.navigate).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Token non valido');
  });
});




