import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments';
import { map, Observable } from 'rxjs';
import { HealthCheck } from '../models/health-check';

@Injectable({
  providedIn: 'root',
})
export class HealthService {
  private readonly http = inject(HttpClient);
  private readonly healthUrl = environment.health_url;

  isServerRunning(): Observable<boolean> {
    return this.http
      .get<HealthCheck>(this.healthUrl)
      .pipe(map((response: HealthCheck) => response.status === 'UP'));
  }
}
