import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionService } from './session.service';
import { Users } from '../models/users';

interface LoginResponse {
  token: string;
  user: Users;
}

interface LoginRequest {
  correo: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly API_URL = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  logInUser(correo: string, password: string): Observable<LoginResponse> {
    const credentials: LoginRequest = { correo, password };
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap(response => {
          if (response.token) {
            this.sessionService.setToken(response.token);
          }
        })
      );
  }

  signin(userData: Users): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/signin`, userData)
      .pipe(
        tap(response => {
          if (response.token) {
            this.sessionService.setToken(response.token);
          }
        })
      );
  }
}