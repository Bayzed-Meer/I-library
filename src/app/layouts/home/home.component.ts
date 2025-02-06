import { Component } from '@angular/core';
import {
  NavbarComponent,
  HeroSectionComponent,
  CategoriesSectionComponent,
  KeyFeaturesComponent,
  BannerSectionComponent,
  FaqSectionComponent,
  ContactSectionComponent,
  FooterComponent,
} from '@layouts';

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
})
export class HomeComponent {}
