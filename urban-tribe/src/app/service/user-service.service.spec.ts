import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user-service.service';
import { environment } from '../../enviroment/enviroment';
import { Injector } from '@angular/core';
import { AuthService } from './auth-service.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, { provide: AuthService, useValue: { tokenMethod: () => 'fake_token' } }]
    });
    service = TestBed.inject(UserService);
    injector = TestBed.inject(Injector);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that no requests are outstanding.
  });

  it('should fetch users correctly', () => {
    const mockUsers = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(1);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should fetch user posts correctly', () => {
    const userId = 1;
    const mockPosts = [{ id: 1, title: 'Post Title', body: 'Post body' }];

    service.getUserPosts(userId).subscribe(posts => {
      expect(posts.length).toBe(1);
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users/${userId}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should fetch post comments correctly', () => {
    const postId = 1;
    const mockComments = [{ id: 1, text: 'Comment text' }];

    service.getPostComments(postId).subscribe(comments => {
      expect(comments.length).toBe(1);
      expect(comments).toEqual(mockComments);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts/${postId}/comments`);
    expect(req.request.method).toBe('GET');
    req.flush(mockComments);
  });

  it('should add a user correctly', () => {
    const newUser = { name: 'New User', email: 'newuser@example.com' };

    service.addUser(newUser).subscribe(user => {
      expect(user.name).toEqual(newUser.name);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush({
      ...newUser,
      id: 2 // Mocked response with an id
    });
  });
});
