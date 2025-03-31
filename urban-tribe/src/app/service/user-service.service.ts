import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _otherService: AuthService | undefined;
  private baseUrl = 'https://gorest.co.in/public/v2';

  constructor(private http: HttpClient, private injector: Injector) {}

  get otherService(): AuthService {
    if (!this._otherService) {
      this._otherService = this.injector.get(AuthService);
    }
    return this._otherService;
  }

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

