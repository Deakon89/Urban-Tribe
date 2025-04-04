import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../service/user-service.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userServiceMock: any;

  beforeEach(async () => {
    // Setup mock for UserService
    userServiceMock = jasmine.createSpyObj('UserService', ['getUsers']);
    userServiceMock.getUsers.and.returnValue(of([{ id: 1, name: 'User One' }, { id: 2, name: 'User Two' }]));

    await TestBed.configureTestingModule({
      imports: [ UserListComponent ],
      providers: [
        { provide: UserService, useValue: userServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    expect(userServiceMock.getUsers).toHaveBeenCalledWith(10); 
    expect(component.users.length).toBe(2); 
  });

  it('should emit selected user when selectUser is called', () => {
    const user = { id: 1, name: 'User One' };
    spyOn(component.userSelected, 'emit');

    component.selectUser(user);

    expect(component.userSelected.emit).toHaveBeenCalledWith(user);
  });
});
