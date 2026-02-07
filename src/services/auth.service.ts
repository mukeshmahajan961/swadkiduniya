import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = signal(false);

  login() {
    // In a real app, this would involve a token, user data, etc.
    this.isLoggedIn.set(true);
  }

  logout() {
    this.isLoggedIn.set(false);
  }
}
