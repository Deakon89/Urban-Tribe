import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../service/user-service.service';
import { PostdetailComponent } from './postdetail.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('PostdetailComponent', () => {
  let component: PostdetailComponent;
  let fixture: ComponentFixture<PostdetailComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<PostdetailComponent>>;
  let data: any;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    
    data = { user: { name: 'John Doe', email: 'john@example.com' }, posts: [{ title: 'Post 1' }, { title: 'Post 2' }] };

    await TestBed.configureTestingModule({
      
      imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatCardModule,
        MatIconModule,
        NoopAnimationsModule,
        PostdetailComponent,
        HttpClientTestingModule,
       
      ],
      providers: [
        { provide: UserService, useClass: UserService },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: data }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive data through MAT_DIALOG_DATA', () => {
    expect(component.data).toEqual(data);
  });

  it('should close the dialog when onClose is called', () => {
    component.onClose();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  
});







