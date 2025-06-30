import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/auth';
  private TOKEN_KEY = 'auth_token';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

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

  private saveToken(token: string): void {
    this.cookieService.set('access_token', token, {
      expires: 1,
      path: '/',
      secure: true,
      sameSite: 'Strict'
    })
  }

  getToken(): string | null{
    return this.cookieService.get(this.TOKEN_KEY)
  }
}
