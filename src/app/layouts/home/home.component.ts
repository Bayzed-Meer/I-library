import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { KeyFeaturesComponent } from '../key-features/key-features.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, HeroSectionComponent, KeyFeaturesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
