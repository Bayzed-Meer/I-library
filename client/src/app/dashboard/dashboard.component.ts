import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  selectedComponent: string | null = null;
  showEditProfile: boolean = false;
  showChangePassword: boolean = false;
  userDetails: any;

  constructor(private authService: AuthService, private router: Router) {}

  selectComponent(component: string): void {
    this.selectedComponent = component;
    this.showEditProfile = false;
    this.showChangePassword = false;
  }

  ngOnInit(): void {
    this.userDetails = this.authService.getUserDetailsFromToken();
    if (this.userDetails.role == 'student') this.selectComponent('profile');
    else this.selectComponent('books-approval');
  }

  editProfile() {
    this.showEditProfile = true;
    this.showChangePassword = false;
  }

  changePassword() {
    this.showChangePassword = true;
    this.showEditProfile = false;
  }

  signout(): void {
    this.authService.signout();
    this.router.navigate(['']);
  }
}
