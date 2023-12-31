import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private API = 'http://localhost:3000';
  private soundapi =
    'https://api.thingspeak.com/channels/2382646/fields/2.json?api_key=4NRBGAZMCSVNTGE4&results=1';
  private card_api =
    'https://api.thingspeak.com/channels/2382646/fields/1.json?api_key=4NRBGAZMCSVNTGE4&results=1';

  constructor(private http: HttpClient) {}

  private lastEntryIdKey = 'lastEntryId';

  getLastEntryId(): number {
    const lastEntryId = localStorage.getItem(this.lastEntryIdKey);
    return lastEntryId ? parseInt(lastEntryId, 10) : 0;
  }

  setLastEntryId(entryId: number): void {
    localStorage.setItem(this.lastEntryIdKey, entryId.toString());
  }

  getCardData(): Observable<any> {
    return this.http.get<any>(this.card_api);
  }

  getSoundData(): Observable<any> {
    return this.http.get<any>(this.soundapi);
  }

  scanCard(libraryId: string): Observable<any> {
    return this.http.post<any>(`${this.API}/students/scan-card`, { libraryId });
  }
}
