import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  image: string = '../../assets/images/contact.gif';
  icon: string = '../../assets/images/contactus.png';

  name: string = '';
  email: string = '';
  message: string = '';

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar() {
    this.snackBar.open('Thanks for contacting us!', 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  clearFields() {
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
