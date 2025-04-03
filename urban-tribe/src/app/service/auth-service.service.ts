import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../enviroment/enviroment';
import { catchError, map, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  
  login(token: string): Observable<boolean> {
    return this.http.get(`${this.baseUrl}/users`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    }).pipe(
      map(() => {
        this.cookieService.set('auth_token', token);
        return true;
      }),
      catchError((error) => {
        console.error('Token non valido:', error);
        return of(false);
      })
    );
  }

  isAuthenticated(): boolean {
    return !!this.cookieService.get('auth_token');
  }

  logout() {
    this.cookieService.delete('auth_token');
  }

  getToken(): string {
    return this.cookieService.get('auth_token');
  }
}
//   login(token: string): boolean {
//     if (this.validateToken(token)) {
//       this.cookieService.set('auth_token', token, 1, '/', undefined, true, 'Strict');
//       return true;
//     }
//     return false;
//   }

//   logout(): void {
//     this.cookieService.delete('auth_token', '/');
//   }

//   isAuthenticated(): boolean {
//     const token = this.cookieService.get('auth_token');
//     return !!token && this.validateToken(token);
//   }

  
//   public validateToken(token: string): boolean {
//     return token === this.validToken;
//   }
// }

