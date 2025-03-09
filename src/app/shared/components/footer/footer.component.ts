import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ThemeService } from '@core';

@Component({
  selector: 'app-footer',
  imports: [MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly themeService = inject(ThemeService);

  protected appTheme = computed(() => this.themeService.appTheme());
}
