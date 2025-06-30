import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/auth';
  private TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient) { }

  register(username: string, password: string) {
    return this.http.post(`${this.API_URL}/register`, { username, password})
      .pipe(
        tap((response: any) => {
            if(response.token) {
              this.saveToken(response.token);
            }
          }  
        )
      )
  };

  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  getToken(): string | null{
    return localStorage.getItem(this.TOKEN_KEY)
  }

  isAuthenticated(): boolean {
    return !!this.getToken(); // Проверяем наличие токена
  } 

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY); // Удаляем токен при выходе
  }

  logIn(username: string, password: string) {
    return this.http.post(`${this.API_URL}/login`, { username, password })
      .pipe(
        tap((response: any) => {
          if(response.access_token) {
            this.saveToken(response.access_token)
          }
        })
      )
  }
}
