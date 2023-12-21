import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:3000'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  createBook(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/books/create`, formData);
  }

  getBooks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/books/getAllBooks`);
  }
}
