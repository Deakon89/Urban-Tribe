// import { Injectable } from '@angular/core';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private validToken = 'c';  // Questo dovrebbe essere il token che aspetti.
//   private isLoggedIn = false;

//   validateToken(token: string): boolean {
//     return token === this.validToken;
//   }

//   login(token: string): boolean {
//     // Qui dovresti validare il token e impostare isLoggedIn a true se è valido
//     this.isLoggedIn = token === this.validToken; // Sostituisci con la tua logica di validazione
//     return this.isLoggedIn;
//   }
//     logout(): void {
//       this.isLoggedIn = false;
//     }
  
//     isAuthenticated(): boolean {
//       return this.isLoggedIn;
//     }
//   }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'; // Assicurati di installare ngx-cookie-service


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  
  login(token: string): boolean {
    // Qui puoi validare il token con il server
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

  public readonly validToken = 'c';
  public validateToken(token: string): boolean {
    return token === this.validToken;
  }
}

