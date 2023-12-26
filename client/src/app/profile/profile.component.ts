import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @Output() editClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() changePasswordClicked: EventEmitter<void> =
    new EventEmitter<void>();
  student: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.student = user;
      },
      error: (error) => {
        console.error('Error fetching current user:', error);
      },
    });
  }

  getImageUrl(): string {
    return `${this.userService.API}/${this.student.image}`;
  }

  onEditClick() {
    this.editClicked.emit();
  }

  onChangePasswordClick() {
    this.changePasswordClicked.emit();
  }
}
