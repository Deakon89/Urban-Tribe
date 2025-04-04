import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail.component';
import { UserService } from '../../service/user-service.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let userServiceMock: any;
  let dialogMock: any;

  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj('UserService', ['getUserPosts']);
    userServiceMock.getUserPosts.and.returnValue(of([])); // Assicurati che ritorni un Observable

    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    dialogMock.open.and.returnValue({ afterClosed: () => of({}) });

    await TestBed.configureTestingModule({
      imports: [ UserDetailComponent ],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: MatDialog, useValue: dialogMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    component.user = { id: 123, name: 'Test User' }; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadUserPosts on init if user is provided', () => {
    expect(userServiceMock.getUserPosts).toHaveBeenCalledWith(123);
  });


});

  