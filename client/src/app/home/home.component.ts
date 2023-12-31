import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  banner: string = '../../assets/images/1.jpg';
  image: string = '../../assets/images/about.avif';
}
