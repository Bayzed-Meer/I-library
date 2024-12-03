import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    standalone: false
})
export class DashboardComponent implements OnInit {
  selectedComponent: string | null = null;
  showEditProfile: boolean = false;
  showChangePassword: boolean = false;
  showEditBooksDetails: boolean = false; // Added property for books-details edit mode
  userDetails: any;
  selectedBookId: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  selectComponent(component: string): void {
    this.selectedComponent = component;
    this.showEditProfile = false;
    this.showChangePassword = false;
    this.showEditBooksDetails = false; // Reset books-details edit mode when switching components
  }

  ngOnInit(): void {
    this.userDetails = this.authService.getUserDetailsFromToken();
    if (this.userDetails.role == 'student') this.selectComponent('profile');
    else this.selectComponent('books-approval');
  }

  editProfile() {
    this.showEditProfile = true;
    this.showChangePassword = false;
    this.showEditBooksDetails = false; // Reset books-details edit mode when editing profile
  }

  changePassword() {
    this.showChangePassword = true;
    this.showEditProfile = false;
    this.showEditBooksDetails = false; // Reset books-details edit mode when changing password
  }

  editBooksDetails(bookId: string) {
    this.showEditBooksDetails = true;
    this.showEditProfile = false;
    this.showChangePassword = false;
    // Set the selected book ID
    this.selectedBookId = bookId;
  }

  signout(): void {
    this.authService.signout();
    this.router.navigate(['']);
  }
}
