import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { AuthService } from './auth-service.service';
import { environment } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _otherService: AuthService | undefined;
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private injector: Injector) {}

  get otherService(): AuthService {
    if (!this._otherService) {
      this._otherService = this.injector.get(AuthService);
    }
    return this._otherService;
  }

  getUsers(limit: number = 10): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`, {
      headers: { Authorization: `Bearer ${environment.token}` }
    });
  }

  getUserPosts(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users/${userId}/posts`, {
      headers: { Authorization: `Bearer ${environment.token}` }
    });
  }

  getPostComments(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/posts/${postId}/comments`, {
      headers: { Authorization: `Bearer ${environment.token}` }
    });
  }

  addUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, userData,{
      headers: { Authorization: `Bearer ${environment.token}` }
    });
  }
}

