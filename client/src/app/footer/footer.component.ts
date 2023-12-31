import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }
}
