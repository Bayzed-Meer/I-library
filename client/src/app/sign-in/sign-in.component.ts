import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  hide = true;
  signinForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      studentId: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = this.signinForm.value;

    this.authService.signin(formData).subscribe({
      next: (response) => {
        console.log('Signin Success:', response);
        console.log(response);
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Signin Error:', error);
      },
    });
  }
}
