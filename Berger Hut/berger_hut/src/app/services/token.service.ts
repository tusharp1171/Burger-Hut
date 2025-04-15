import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'accessToken';
  private http = inject(HttpClient);
  private cachedUserId: number | null = null;

  constructor() {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
  }

  setToken(token: string): void {
    if (this.isBrowser()) {
      sessionStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    return this.isBrowser() ? sessionStorage.getItem(this.TOKEN_KEY) : null;
  }

  clearToken(): void {
    if (this.isBrowser()) {
      sessionStorage.removeItem(this.TOKEN_KEY);
    }
    this.cachedUserId = null;
  }

  getTokenPayload(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  }

  getUsernameFromToken(): string | null {
    const payload = this.getTokenPayload();
    console.log(payload);
    
    return payload?.sub || payload?.username || null;
  }

  isTokenExpired(): boolean {
    const payload = this.getTokenPayload();
    if (!payload || !payload.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  }

  getTokenExpirationTime(): number | null {
    const payload = this.getTokenPayload();
    return payload?.exp ? payload.exp * 1000 : null;
  }

  getTokenRemainingTime(): number {
    const expiration = this.getTokenExpirationTime();
    const now = Date.now();
    return expiration ? expiration - now : 0;
  }

  /** 🔥 Fetches and caches user ID only once */
  fetchAndCacheUserId(): Observable<number | null> {
    const username = this.getUsernameFromToken();
    if (!username) return of(null);

    return this.http.get<number>(`http://localhost:8080/api/auth/id/${username}`).pipe(
      tap((id: number) => this.cachedUserId = id),
      catchError(err => {
        console.error('Failed to get user ID:', err);
        return of(null);
      })
    );
  }

  /** ✅ Get cached user ID directly */
  getCachedUserId(): number | null {
    console.log(this.cachedUserId);
    
    return this.cachedUserId; 
  }

  getRoles(): string[] {
    const payload = this.getTokenPayload();
    if (!payload || !payload.roles) return [];
  
    return Array.isArray(payload.roles) ? payload.roles : [payload.roles];
  }
}



// const username = this.tokenService.getUsernameFromToken();
// // console.log('Logged in user:', username);

// this.tokenService.fetchAndCacheUserId().subscribe(userId => {
//   // console.log('Fetched user ID:', userId);

//   // ✅ Now safe to use cachedUserId
//   const cachedId = this.tokenService.getCachedUserId();
//   // console.log('Cached user ID (after fetch):', cachedId);