import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getStudentsWithActivities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/students/with-activities`);
  }

  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      return throwError(() => new Error('Token not found'));
    }

    const decodedToken = this.decodeJwt(token);
    const libraryId = decodedToken.libraryId;

    return this.http.get(`${this.API}/students/getStudent/${libraryId}`).pipe(
      catchError((error) => {
        console.error('Error fetching current user:', error);
        return throwError(() => new Error('Error fetching current user'));
      })
    );
  }

  updateUserDetails(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      return throwError(() => new Error('Token not found'));
    }

    const decodedToken = this.decodeJwt(token);
    const libraryId = decodedToken.libraryId;

    return this.http
      .patch(`${this.API}/students/updateStudent/${libraryId}`, formData)
      .pipe(
        catchError((error) => {
          console.error('Error updating user details:', error);
          return throwError(() => new Error('Error updating user details'));
        })
      );
  }

  private decodeJwt(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = window.atob(payload);

    return JSON.parse(decodedPayload);
  }
}
