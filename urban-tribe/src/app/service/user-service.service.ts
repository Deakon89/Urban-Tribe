import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://gorest.co.in/public/v2';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`, {
      headers: { Authorization: `Bearer c348b3f17a6eba188295f45da783e9913329ccd443e4c6fda057539f6bb035c7` }
    });
  }

  getUserPosts(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users/${userId}/posts`, {
      headers: { Authorization: `Bearer c348b3f17a6eba188295f45da783e9913329ccd443e4c6fda057539f6bb035c7` }
    });
  }

  getPostComments(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/posts/${postId}/comments`, {
      headers: { Authorization: `Bearer c348b3f17a6eba188295f45da783e9913329ccd443e4c6fda057539f6bb035c7` }
    });
  }
}

