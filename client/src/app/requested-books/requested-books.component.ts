import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from '../book.service';
import { UserService } from '../user.service';

export interface bookData {
  title: string;
  requestedTime: string | null;
  id: string;
}

@Component({
    selector: 'app-requested-books',
    templateUrl: './requested-books.component.html',
    styleUrls: ['./requested-books.component.css'],
    standalone: false
})
export class RequestedBooksComponent implements AfterViewInit {
  displayedColumns: string[] = ['no', 'title', 'requestedTime', 'actions'];
  dataSource!: MatTableDataSource<bookData>;

  currentUser: any;
  requestedBooks: bookData[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private bookService: BookService
  ) {
    this.dataSource = new MatTableDataSource<bookData>([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(
      (user) => {
        this.currentUser = user;

        this.currentUser.requestedBooks.forEach((request: any) => {
          this.bookService.getBook(request.bookId).subscribe(
            (book) => {
              this.requestedBooks.push({
                title: book.title,
                requestedTime: request.requestTime,
                id: request._id,
              });

              this.dataSource.data = this.requestedBooks;
            },
            (error) => {
              console.error('Error fetching book details:', error);
            }
          );
        });
      },
      (error) => {
        console.error('Error fetching current user:', error);
      }
    );
  }
  removeBook(element: any) {
    const bookIndex = this.requestedBooks.indexOf(element);

    if (bookIndex !== -1) {
      this.requestedBooks.splice(bookIndex, 1);
      this.dataSource.data = this.requestedBooks;
    }

    this.userService.deleteRequestedBook(element.id).subscribe(
      () => {
        console.log('Requested book deleted successfully from the database.');
      },
      (error) => {
        console.error(
          'Error deleting requested book from the database:',
          error
        );
      }
    );
  }
}
