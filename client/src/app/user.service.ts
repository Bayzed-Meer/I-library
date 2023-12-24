import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API = 'http://localhost:3000';
  private card_api =
    'https://api.thingspeak.com/channels/2382646/fields/1.json?api_key=4NRBGAZMCSVNTGE4&results=1';

  constructor(private http: HttpClient) {}

  getCardData(): Observable<any> {
    return this.http.get<any>(this.card_api);
  }

  getStudentsById(id: string): Observable<any> {
    return this.http.get(`${this.API}/students/${id}`);
  }
}
