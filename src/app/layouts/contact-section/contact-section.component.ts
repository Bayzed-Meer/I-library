import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '@core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-contact-section',
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
})
export class ContactSectionComponent {
  private readonly themeService = inject(ThemeService);

  protected appTheme = computed(() => this.themeService.appTheme());
}
