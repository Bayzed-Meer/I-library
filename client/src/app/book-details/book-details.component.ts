// book-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from './../book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book: any;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const bookString = this.route.snapshot.paramMap.get('book');
    if (bookString) {
      this.book = JSON.parse(bookString);
    }
    console.log(this.book);
  }

  getImageUrl(book: any): string {
    return `${this.bookService.API}/${book.image}`;
  }
}
