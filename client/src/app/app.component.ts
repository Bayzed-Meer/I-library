import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn = false;
  userDetails: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userDetails = this.authService.getUserDetailsFromToken();
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }
}
