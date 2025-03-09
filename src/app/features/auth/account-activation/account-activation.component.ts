import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ThemeService } from '@core';

@Component({
  selector: 'app-account-activation',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './account-activation.component.html',
  styleUrl: './account-activation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountActivationComponent {
  private readonly themeService = inject(ThemeService);

  protected appTheme = computed(() => this.themeService.appTheme());
}
