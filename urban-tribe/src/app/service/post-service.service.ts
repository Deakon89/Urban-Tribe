import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../component/post-list/post-list.component';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://gorest.co.in/public/v2';  // Adatta l'URL all'API che stai usando

  constructor(private http: HttpClient) {}

  getPosts(limit: number = 10): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`,{headers: { Authorization: `Bearer c348b3f17a6eba188295f45da783e9913329ccd443e4c6fda057539f6bb035c7` }
    });
  }

  getComments(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posts/${postId}/comments`);
  }

  addPost(post: { title: string; body: string }): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts`, post,{headers: { Authorization: `Bearer c348b3f17a6eba188295f45da783e9913329ccd443e4c6fda057539f6bb035c7` }});
  }

  addComment(postId: number, commentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/posts/${postId}/comments`, commentData, {
      headers: { Authorization: `Bearer c348b3f17a6eba188295f45da783e9913329ccd443e4c6fda057539f6bb035c7` }
    });
  }
  
}

