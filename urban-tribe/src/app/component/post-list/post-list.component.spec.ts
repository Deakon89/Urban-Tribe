import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PostService } from '../../service/post-service.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let postService: PostService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        PostListComponent 
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    postService = TestBed.inject(PostService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load posts on initialization', () => {
    const mockPosts = [
      { id: 1, title: 'Test Post', body: 'This is a test', user_id: 1, comments: [] }
    ];
    spyOn(postService, 'getPosts').and.returnValue(of(mockPosts));
    component.ngOnInit();
    expect(postService.getPosts).toHaveBeenCalled();
    expect(component.posts.length).toBe(1);
  });

  it('should handle error when loading posts fails', () => {
    spyOn(postService, 'getPosts').and.returnValue(throwError(() => new Error('Error loading posts')));
    component.loadPosts();
    expect(postService.getPosts).toHaveBeenCalled();
    
  });



  it('should add a comment to the post', () => {
    component.posts = [{
      id: 1,
      title: 'Existing Post',
      body: 'Post content',
      user_id: 1,
      comments: []
    }];
    const newComment = { post_id: 1, name: 'Nome Utente', email: 'email@esempio.it', body: 'Great post!' };
    const inputElement = document.createElement('input');
    inputElement.value = 'Great post!';

    spyOn(postService, 'addComment').and.returnValue(of(newComment));
    component.addComment(1, 'Great post!', inputElement);

    fixture.detectChanges(); 

    expect(postService.addComment).toHaveBeenCalledWith(1, newComment);
    expect(component.posts[0].comments.length).toBe(1);
    expect(component.posts[0].comments[0].body).toEqual('Great post!');
    expect(inputElement.value).toBe(''); 
  });

  it('should not add a comment when input is empty', () => {
    component.posts = [{
      id: 1,
      title: 'Existing Post',
      body: 'Post content',
      user_id: 1,
      comments: []
    }];
    const inputElement = document.createElement('input');
    inputElement.value = '';

    component.addComment(1, '', inputElement);
  });
});
 






