import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  // Replace with your actual API endpoint
  API = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createBook(formData: FormData): Observable<any> {
    return this.http.post(`${this.API}/books/create`, formData);
  }

  getBooks(): Observable<any> {
    return this.http.get<any>(`${this.API}/books/getAllBooks`);
  }
}
