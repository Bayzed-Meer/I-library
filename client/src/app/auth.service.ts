import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  message: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API = 'http://localhost:3000';
  private loggedIn = new BehaviorSubject<boolean>(this.checkToken());

  constructor(private http: HttpClient) {}

  private checkToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  signup(formData: FormData): Observable<any> {
    return this.http.post(`${this.API}/auth/signup`, formData);
  }

  signin(formData: FormData): Observable<any> {
    return this.http
      .post<AuthResponse>(`${this.API}/auth/signin`, formData)
      .pipe(
        tap((response) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            this.loggedIn.next(true);
          }
        })
      );
  }

  signout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  getUserDetailsFromToken(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload;
    }
    return null;
  }

  changePassword(formData: FormData): Observable<any> {
    return this.http.post(`${this.API}/auth/changePassword`, formData);
  }
}
