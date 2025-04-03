import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../enviroment/enviroment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  
  login(token: string): boolean {
    if (this.validateToken(token)) {
      this.cookieService.set('auth_token', token, 1, '/', undefined, true, 'Strict');
      return true;
    }
    return false;
  }

  logout(): void {
    this.cookieService.delete('auth_token', '/');
  }

  isAuthenticated(): boolean {
    const token = this.cookieService.get('auth_token');
    return !!token && this.validateToken(token);
  }

  public readonly validToken = environment.token;
  public validateToken(token: string): boolean {
    return token === this.validToken;
  }
}

