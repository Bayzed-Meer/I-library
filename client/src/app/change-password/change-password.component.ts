import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.changePasswordForm = this.fb.group({
      studentId: ['', Validators.required],
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = this.changePasswordForm.value;

    this.authService.changePassword(formData).subscribe({
      next: (response) => {
        console.log('Password Changed:', response);
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Signin Error:', error);
      },
    });
  }
}
