import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BookService } from './../book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: any[] = [];
  filteredBooks: any[] = [];
  categories: string[] = [
    'CSE',
    'Civil',
    'IT',
    'Pharmacy',
    'BBA',
    'English',
    'Law',
    'Social Work',
  ];
  ratings: number[] = [1, 2, 3, 4, 5];
  searchTitle: string = '';
  selectedCategory: string = '';
  selectedRating: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Paginator variables
  pageIndex = 0;
  pageSize = 2; // Change this value based on your preference
  pageSizeOptions: number[] = [4, 8, 12];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(
      (data) => {
        this.books = data;
        this.filteredBooks = [...this.books];
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  filterBooks() {
    if (this.searchTitle || this.selectedCategory || this.selectedRating) {
      this.filteredBooks = this.books.filter(
        (book) =>
          this.filterByTitle(book) &&
          this.filterByCategory(book) &&
          this.filterByRating(book)
      );
    } else {
      // If no search criteria selected, show all books
      this.filteredBooks = [...this.books];
    }
  }

  filterByTitle(book: any): boolean {
    return book.title.toLowerCase().includes(this.searchTitle.toLowerCase());
  }

  filterByCategory(book: any): boolean {
    return !this.selectedCategory || book.category === this.selectedCategory;
  }

  filterByRating(book: any): boolean {
    return !this.selectedRating || book.rating === this.selectedRating;
  }

  selectCategory(category: string): void {
    this.selectedCategory = this.selectedCategory === category ? '' : category;
    this.filterBooks();
  }

  selectRating(rating: number): void {
    this.selectedRating = this.selectedRating === rating ? 0 : rating;
    this.filterBooks();
  }

  getImageUrl(book: any): string {
    // Use absolute URL for images
    return `${this.bookService.API}/${book.image}`;
  }

  pageChanged(event: any) {
    this.pageIndex = event.pageIndex;
  }

  viewBookDetails(book: any) {
    this.router.navigate(['/book-details', { book: JSON.stringify(book) }]);
  }
}
