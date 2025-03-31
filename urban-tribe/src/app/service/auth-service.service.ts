import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private validToken = 'c';  // Questo dovrebbe essere il token che aspetti.

  validateToken(token: string): boolean {
    return token === this.validToken;
  }
}
