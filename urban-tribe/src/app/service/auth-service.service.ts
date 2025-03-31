import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private validToken = 'c348b3f17a6eba188295f45da783e9913329ccd443e4c6fda057539f6bb035c7';  // Questo dovrebbe essere il token che aspetti.

  validateToken(token: string): boolean {
    return token === this.validToken;
  }
}
