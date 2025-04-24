import { isPlatformBrowser } from '@angular/common';
import { Injectable, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly TOKEN_KEY = 'token';
  
  // Event Emitters para el estado de la sesión
  sessionAct$ = new EventEmitter<boolean>();
  userId$ = new EventEmitter<string>();
  isBrowser: any;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  setToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  updateSession(userId: string): void {
    this.userId$.emit(userId);
    this.sessionAct$.emit(true);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.sessionAct$.emit(false);
    this.userId$.emit('');
    this.router.navigate(['/']);
  }
}