import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const token = this.getToken();
    const libraryId = token.libraryId;

    return this.http.get(`${this.API}/students/getStudent/${libraryId}`).pipe(
      catchError((error) => {
        console.error('Error fetching current user:', error);
        return throwError(() => new Error('Error fetching current user'));
      })
    );
  }

  getAllUsersDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/students/getAllUsersDetails`);
  }

  updateUserDetails(formData: FormData): Observable<any> {
    const token = this.getToken();
    const libraryId = token.libraryId;

    return this.http
      .patch(`${this.API}/students/updateStudent/${libraryId}`, formData)
      .pipe(
        catchError((error) => {
          console.error('Error updating user details:', error);
          return throwError(() => new Error('Error updating user details'));
        })
      );
  }

  deleteRequestedBook(bookId: string): Observable<any> {
    const token = this.getToken();
    const libraryId = token.libraryId;

    // Use the second argument of the delete method to pass data
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { bookId, libraryId }, // Include data in the request body
    };

    return this.http.delete(`${this.API}/books/deleteRequestedBook`, options);
  }

  private getToken(): any {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('Token not found'));
    }
    const payload = token.split('.')[1];
    const decodedPayload = window.atob(payload);

    return JSON.parse(decodedPayload);
  }
}
