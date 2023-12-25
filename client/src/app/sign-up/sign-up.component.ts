import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { CardService } from './../card.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  hide = true;
  signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private cardService: CardService,
    private fb: FormBuilder
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      studentId: ['', Validators.required],
      libraryId: ['', Validators.required],
      department: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  card_data: any;
  ngOnInit() {
    this.cardService.getCardData().subscribe((response) => {
      this.card_data = response;
    });
  }

  onSubmit() {
    const formData = this.signupForm.value;
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
