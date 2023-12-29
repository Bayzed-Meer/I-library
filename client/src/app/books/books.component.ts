import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
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
    'BBA',
    'English',
    'Law',
    'Pharmacy',
    'Social Work',
  ];
  ratings: number = 0;
  searchTitle: string = '';
  selectedCategory: string = '';
  selectedRating: number = 0;
  isLoggedIn = false;
  showPaginator = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 4;
  pageSizeOptions: number[] = [4, 8, 12];

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getAllBooks().subscribe(
      (data) => {
        this.books = data;
        this.filteredBooks = this.getPaginatedBooks(0);
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
      console.log(this.filteredBooks);
      this.showPaginator = false;
    } else {
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
    return `${this.bookService.API}/${book.image}`;
  }

  pageChanged(event: any) {
    this.pageIndex = event.pageIndex;
    this.filteredBooks = this.getPaginatedBooks(this.pageIndex);
    this.filterBooks();
  }

  viewBookDetails(book: any) {
    this.router.navigate(['/book-details', { book: JSON.stringify(book) }]);
  }

  requestBook(book: any) {
    if (this.isLoggedIn) {
      const bookId = book._id;
      this.bookService.requestBook(bookId).subscribe(
        (response) => {
          console.log('Book request sent successfully:', response);
        },
        (error) => {
          console.error('Error sending book request:', error);
        }
      );
    } else {
      this.router.navigate(['/signIn']);
    }
  }
  getPaginatedBooks(pageIndex: number): any[] {
    const startIndex = pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    const safeStartIndex = Math.max(startIndex, 0);
    return this.books.slice(safeStartIndex, endIndex);
  }
}
