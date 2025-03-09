export interface HealthCheck {
  status: 'UP' | 'DOWN';
  timestamp: string;
}
