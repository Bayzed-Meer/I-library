import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from './../book.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent implements OnInit {
  @Input() bookId: string | null = null;

  bookForm: FormGroup;

  constructor(private bookService: BookService, private fb: FormBuilder) {
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

  ngOnInit() {
    if (this.bookId !== null && this.bookId !== undefined) {
      this.bookService.getBook(this.bookId).subscribe({
        next: (book) => {
          this.bookForm.patchValue(book);
          console.log(book);
        },
        error: (error) => {
          console.error('Error fetching book details:', error);
        },
      });
    }
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

    if (this.bookId !== null && this.bookId !== undefined) {
      this.bookService.updateBook(this.bookId, formData).subscribe({
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
