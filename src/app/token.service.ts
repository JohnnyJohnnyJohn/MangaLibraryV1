import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public setToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  public clearToken(): void {
    localStorage.removeItem('accessToken');
  }

  isAuthenticated(): boolean {
    return this.getToken() != null;
  }

}
