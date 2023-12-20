// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  signup(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, formData);
  }

  signin(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signin`, formData);
  }
}
