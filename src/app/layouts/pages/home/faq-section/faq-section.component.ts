import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-faq-section',
  imports: [CdkAccordionModule, MatIconModule],
  templateUrl: './faq-section.component.html',
  styleUrl: './faq-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqSectionComponent {
  items = [
    'How does a library management system work?',
    'How does a library management system work?',
    'How does a library management system work?',
    'How does a library management system work?',
  ];
}
