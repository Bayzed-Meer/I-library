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
  selector: 'app-borrow-history',
  templateUrl: './borrow-history.component.html',
  styleUrls: ['./borrow-history.component.css'],
})
export class BorrowHistoryComponent implements AfterViewInit {
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

        this.bookService.getBorrowHistory(this.currentUser.libraryId).subscribe(
          (borrowedBooks) => {
            console.log(borrowedBooks);
            this.borrowedBooks = borrowedBooks.map((borrowedBook: any) => {
              return {
                title: borrowedBook.bookName,
                borrowDate: borrowedBook.borrowTime,
                returnDate: borrowedBook.returnTime,
                id: borrowedBook._id,
              };
            });

            this.dataSource.data = this.borrowedBooks;
          },
          (error) => {
            console.error('Error fetching borrow history:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching current user:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
