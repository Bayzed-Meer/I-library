import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from './../book.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css'],
})
export class CreateBookComponent {
  bookForm: FormGroup;

  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required],
      edition: ['', Validators.required],
      description: [''],
      quantity: ['', Validators.required],
      rating: ['', Validators.required],
      image: [null],
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.bookForm.get('image')!.setValue(file);
  }

  onSubmit() {
    const formData = new FormData();
    Object.keys(this.bookForm.value).forEach((key) => {
      formData.append(key, this.bookForm.get(key)!.value);
    });

    this.bookService.createBook(formData).subscribe({
      next: (response) => {
        console.log('Success:', response);
        this.router.navigate(['/books']);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}
