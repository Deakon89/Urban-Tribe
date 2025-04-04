import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../../service/auth-service.service';
import { UserService } from '../../service/user-service.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService: AuthService;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        DashboardComponent
      ],
      providers: [ AuthService, UserService ],
      schemas: [ NO_ERRORS_SCHEMA ] 
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log out and navigate to login', () => {
    spyOn(authService, 'logout').and.callThrough();
    spyOn(router, 'navigate');
    
    component.logout();

    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to posts when seePosts is called', () => {
    spyOn(router, 'navigate');
    component.seePosts();
    expect(router.navigate).toHaveBeenCalledWith(['/posts']);
  });

  it('should add user when form is valid and submitted', () => {
    spyOn(userService, 'addUser').and.returnValue(of({ id: 1, name: 'Test User' }));
    component.userForm.setValue({
      name: 'Test User',
      email: 'test@example.com',
      gender: 'female',
      status: 'active'
    });

    component.onSubmitUser();

    expect(userService.addUser).toHaveBeenCalledWith(jasmine.anything());
  });
});

