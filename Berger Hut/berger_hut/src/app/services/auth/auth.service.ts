import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupRequest } from '../../models/auth/SignupRequest';
import { SigninRequest } from '../../models/auth/SigninRequest';
import { AuthResponse } from '../../models/auth/AuthResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  signup(data: SignupRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/signup`, data);
  }

  signin(data: SigninRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/signin`, data);
  }

  getUserIdByUsername(username: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/id/${username}`);
  }
}

