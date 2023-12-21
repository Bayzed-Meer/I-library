// user.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  signup(formData: FormData): Observable<any> {
    return this.http.post(`${this.API}/auth/signup`, formData);
  }

  signin(formData: FormData): Observable<any> {
    return this.http.post(`${this.API}/auth/signin`, formData);
  }
}
