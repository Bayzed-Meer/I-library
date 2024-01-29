import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn = false;
  userDetails: any;
  showNavbar: boolean = true;

  constructor(private authService: AuthService, private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !event.url.includes('/signIn');
      }
    });
  }

  ngOnInit() {
    this.userDetails = this.authService.getUserDetailsFromToken();
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }
}
