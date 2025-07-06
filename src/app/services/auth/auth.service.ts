import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private TOKEN_KEY = 'access_token';
  private readonly API_URL = environment.API_URL;
  private readonly http = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

  // prettier-ignore
  register(username: string, password: string) {
    return this.http
    .post(
        `${this.API_URL}/register`,
        { username, password }
      ).pipe(
      tap((response: any) => {
        if (response.access_token) {
          this.saveToken(response.access_token);
        }
      })
    );
  }

  isAuthenticated(): boolean {
    return !!this.getToken(); // Проверяем наличие токена
  }

  logout(): void {
    // Удаляем токен при выходе
  }

  logIn(username: string, password: string) {
    return this.http.post(`${this.API_URL}/login`, { username, password }).pipe(
      tap((response: any) => {
        if (response.access_token) {
          this.saveToken(response.access_token);
        }
      })
    );
  }

  getToken(): string | null {
    return this.cookieService.get(this.TOKEN_KEY);
  }

  private saveToken(token: string): void {
    this.cookieService.set(this.TOKEN_KEY, token, {
      expires: 1,
      path: '/',
      secure: true,
      sameSite: 'Strict',
    });
  }
}
