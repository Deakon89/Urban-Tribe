import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostService } from './post-service.service';
import { environment } from '../../enviroment/enviroment';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService]
    });
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no requests are outstanding.
  });

  it('should fetch posts correctly', () => {
    const mockPosts = [{ id: 1, title: 'Test Post', body: 'This is a test', user_id: 1, comments: [] }];
    
    service.getPosts().subscribe(posts => {
      expect(posts.length).toBe(1);
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts); // Simulate successful response
  });

  it('should add a new post and return it', () => {
    const newPost = { title: 'New Post', body: 'Content of the new post' };

    service.addPost(newPost).subscribe(post => {
      expect(post.title).toEqual(newPost.title);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newPost);
    req.flush({
      ...newPost,
      id: 100, // Mocked response with an id
      user_id: 1,
      comments: []
    });
  });

  it('should fetch comments for a post', () => {
    const postId = 1;
    const mockComments = [{ id: 1, postId: 1, content: 'Comment 1' }];

    service.getComments(postId).subscribe(comments => {
      expect(comments.length).toBe(1);
      expect(comments).toEqual(mockComments);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts/${postId}/comments`);
    expect(req.request.method).toBe('GET');
    req.flush(mockComments);
  });

  it('should add a comment to a post', () => {
    const postId = 1;
    const commentData = { content: 'New Comment' };
    const expectedResponse = { id: 1, postId: 1, content: 'New Comment' };

    service.addComment(postId, commentData).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts/${postId}/comments`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(commentData);
    req.flush(expectedResponse);
  });
});
