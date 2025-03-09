import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent, FooterComponent } from '@shared';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { CategoriesSectionComponent } from './categories-section/categories-section.component';
import { KeyFeaturesComponent } from './key-features/key-features.component';
import { FaqSectionComponent } from './faq-section/faq-section.component';
import { BannerSectionComponent } from './banner-section/banner-section.component';
import { ContactSectionComponent } from './contact-section/contact-section.component';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    HeroSectionComponent,
    CategoriesSectionComponent,
    KeyFeaturesComponent,
    BannerSectionComponent,
    FaqSectionComponent,
    ContactSectionComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
