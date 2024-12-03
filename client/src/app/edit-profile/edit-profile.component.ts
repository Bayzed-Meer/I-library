import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css'],
    standalone: false
})
export class EditProfileComponent implements OnInit {
  updateForm: FormGroup;
  hide = true;
  currentUser: any;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.updateForm = this.fb.group({
      username: ['', Validators.required],
      department: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      image: [null],
    });
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(
      (user) => {
        this.currentUser = user;
        this.updateForm.patchValue({
          username: this.currentUser.username,
          department: this.currentUser.department,
          email: this.currentUser.email,
          password: '',
          phoneNumber: this.currentUser.phoneNumber,
          image: this.currentUser.image,
        });
      },
      (error) => {
        console.error('Error fetching current user:', error);
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.updateForm.get('image')!.setValue(file);
  }

  onSubmit() {
    if (this.updateForm.valid) {
      const formData = new FormData();
      Object.keys(this.updateForm.value).forEach((key) => {
        formData.append(key, this.updateForm.get(key)!.value);
      });

      this.userService.updateUserDetails(formData).subscribe(
        (updatedUser) => {
          console.log('User details updated:', updatedUser);
        },
        (error) => {
          console.error('Error updating user details:', error);
        }
      );
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
}
