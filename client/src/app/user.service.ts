import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getStudentsWithActivities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/students/with-activities`);
  }
}
