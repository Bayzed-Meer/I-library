import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { CardService } from './../card.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
    standalone: false
})
export class SignUpComponent implements OnInit {
  hidePassword = true;
  hideConfirmPassword = true;
  signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private cardService: CardService,
    private fb: FormBuilder
  ) {
    this.signupForm = this.fb.group(
      {
        username: ['', Validators.required],
        studentId: ['', Validators.required],
        libraryId: ['', Validators.required],
        department: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        phoneNumber: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  card_data: any;
  ngOnInit() {
    this.cardService.getCardData().subscribe((response) => {
      this.card_data = response;
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')!.value;
    const confirmPassword = form.get('confirmPassword')!.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = { ...this.signupForm.value };

      delete formData.confirmPassword;

      this.authService.signup(formData).subscribe({
        next: (response) => {
          console.log('Success:', response);
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
    }
  }
}
