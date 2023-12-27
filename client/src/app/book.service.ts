import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  API = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createBook(formData: FormData): Observable<any> {
    return this.http.post(`${this.API}/books/create`, formData);
  }

  getAllBooks(): Observable<any> {
    return this.http.get<any>(`${this.API}/books/getAllBooks`);
  }

  getBook(bookId: number): Observable<any> {
    return this.http.get<any>(`${this.API}/books/getBook/${bookId}`);
  }

  requestBook(bookId: number): Observable<any> {
    const token = this.getToken();
    const libraryId = token.libraryId;
    return this.http.post(`${this.API}/books/requestBook`, {
      bookId,
      libraryId,
    });
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
