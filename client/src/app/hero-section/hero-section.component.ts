import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
})
export class HeroSectionComponent {
  banner: string = '../../assets/images/Reading book.gif';
  image: string = '../../assets/images/about.avif';
}
