import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css'],
    standalone: false
})
export class SignInComponent {
  signinForm: FormGroup;
  image: string = './../../assets/images/Learning.gif';
  showError: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signinForm = this.fb.group({
      studentId: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = this.signinForm.value;

    this.authService.signin(formData).subscribe({
      next: (response) => {
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Signin Error:', error);
        this.showError = true;
      },
    });
  }

  back() {
    this.router.navigate(['']);
  }
}
