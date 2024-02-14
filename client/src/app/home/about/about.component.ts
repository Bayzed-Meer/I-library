import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  image: string = './../../assets/images/about.gif';
  icon: string = '../../assets/images/aboutIcon.png';
}
