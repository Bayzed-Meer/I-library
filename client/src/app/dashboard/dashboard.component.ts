import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  selectedComponent: string | null = null;
  showEditProfile: boolean = false;
  showChangePassword: boolean = false;

  selectComponent(component: string): void {
    this.selectedComponent = component;
    this.showEditProfile = false;
    this.showChangePassword = false;
  }

  editProfile() {
    this.showEditProfile = true;
    this.showChangePassword = false;
  }

  changePassword() {
    this.showChangePassword = true;
    this.showEditProfile = false;
  }
}
