import { Component, effect, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HealthService, ThemeService } from '@core';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule],
})
export class AppComponent implements OnInit {
  private readonly themeService = inject(ThemeService);
  private readonly healthService = inject(HealthService);
  private readonly router = inject(Router);

  // private readonly isServerRunning = toSignal(
  //   this.healthService.isServerRunning(),
  //   {
  //     initialValue: true,
  //   }
  // );
  //
  // constructor() {
  //   effect(() => {
  //     if (!this.isServerRunning()) {
  //       this.router.navigate(['/error/500']);
  //     }
  //   });
  // }

  ngOnInit(): void {
    this.themeService.themeInit();
  }
}
