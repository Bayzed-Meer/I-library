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

  getAllIssuedBooks(): Observable<any> {
    return this.http.get<any>(`${this.API}/books/getAllIssuedBooks`);
  }
  getAllbookHistory(): Observable<any> {
    return this.http.get<any>(`${this.API}/books/getAllbookHistory`);
  }

  getAllRequestedBooks(): Observable<any> {
    return this.http.get<any>(`${this.API}/books/getAllRequestedBooks`);
  }

  getBorrowHistory(libraryId: string): Observable<any> {
    return this.http.get<any>(`${this.API}/books/borrowHistory/${libraryId}`);
  }

  getBook(bookId: string): Observable<any> {
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

  acceptBookRequest(objectId: string, libraryId: string): Observable<any> {
    return this.http.post(`${this.API}/books/acceptBookRequest`, {
      objectId,
      libraryId,
    });
  }

  returnBook(objectId: string, libraryId: string): Observable<any> {
    return this.http.post(`${this.API}/books/returnBook`, {
      objectId,
      libraryId,
    });
  }

  updateBook(bookId: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.API}/books/updateBook/${bookId}`, formData);
  }

  declineBookRequest(objectId: string, libraryId: string): Observable<any> {
    return this.http.delete(
      `${this.API}/books/declineBookRequest/${objectId}/${libraryId}`
    );
  }

  deleteBook(bookId: number): Observable<any> {
    return this.http.delete<any>(`${this.API}/books/deleteBook/${bookId}`);
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
