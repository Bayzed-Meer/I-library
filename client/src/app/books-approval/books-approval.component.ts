import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from '../book.service';

export interface RequestBookData {
  name: string;
  libraryId: string;
  bookName: string;
  requestedTime: string | null;
  objectId: string;
}

@Component({
  selector: 'app-books-approval',
  templateUrl: './books-approval.component.html',
  styleUrls: ['./books-approval.component.css'],
})
export class BooksApprovalComponent implements AfterViewInit, OnInit {
  requestedBooks: RequestBookData[] = [];
  displayedColumns: string[] = [
    'no',
    'name',
    'libraryId',
    'bookName',
    'requestedTime',
    'actions',
  ];
  dataSource!: MatTableDataSource<RequestBookData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private bookService: BookService) {
    this.dataSource = new MatTableDataSource<RequestBookData>([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.bookService.getAllRequestedBooks().subscribe(
      (books) => {
        console.log(books);
        this.requestedBooks = books;
        this.dataSource.data = this.requestedBooks;
      },
      (error) => {
        console.error('Error fetching requested books:', error);
      }
    );
  }

  acceptRequest(row: any) {
    const objectId = row.objectId;
    const libraryId = row.libraryId;

    this.bookService.acceptBookRequest(objectId, libraryId).subscribe(
      () => {
        const index = this.requestedBooks.findIndex(
          (book) => book.objectId === objectId
        );

        if (index !== -1) {
          this.requestedBooks.splice(index, 1);
          this.dataSource.data = this.requestedBooks.slice();
        }
        console.log('Request accepted successfully for book:', objectId);
      },
      (error) => {
        console.error('Error accepting book request:', error);
      }
    );
  }

  declineRequest(row: any) {
    const objectId = row.objectId;
    const libraryId = row.libraryId;

    this.bookService.declineBookRequest(objectId, libraryId).subscribe(
      () => {
        const index = this.requestedBooks.findIndex(
          (book) => book.objectId === objectId
        );

        if (index !== -1) {
          this.requestedBooks.splice(index, 1);
          this.dataSource.data = this.requestedBooks.slice();
        }
        console.log('Request declined successfully for book:', objectId);
      },
      (error) => {
        console.error('Error declining book request:', error);
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
