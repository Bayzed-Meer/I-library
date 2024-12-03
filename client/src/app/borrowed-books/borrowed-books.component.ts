import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from '../book.service';
import { UserService } from '../user.service';

export interface BorrowedData {
  title: string;
  borrowDate: string | null;
  returnDate: string | null;
  id: string;
}

@Component({
    selector: 'app-borrowed-books',
    templateUrl: './borrowed-books.component.html',
    styleUrls: ['./borrowed-books.component.css'],
    standalone: false
})
export class BorrowedBooksComponent implements AfterViewInit {
  displayedColumns: string[] = ['no', 'title', 'borrowTime', 'returnDate'];
  dataSource!: MatTableDataSource<BorrowedData>;

  currentUser: any;
  borrowedBooks: BorrowedData[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private bookService: BookService
  ) {
    this.dataSource = new MatTableDataSource<BorrowedData>([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(
      (user) => {
        this.currentUser = user;

        this.currentUser.currentlyBorrowedBooks.forEach((borrowedBook: any) => {
          this.bookService.getBook(borrowedBook.bookId).subscribe(
            (book) => {
              this.borrowedBooks.push({
                title: book.title,
                borrowDate: borrowedBook.borrowTime,
                returnDate: borrowedBook.returnTime,
                id: borrowedBook._id,
              });

              console.log(this.borrowedBooks);

              this.dataSource.data = this.borrowedBooks;
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
}
