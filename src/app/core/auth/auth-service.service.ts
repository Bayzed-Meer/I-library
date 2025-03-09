import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private readonly http = inject(HttpClient);
  private readonly AUTH_URL = environment.auth_url;
}
