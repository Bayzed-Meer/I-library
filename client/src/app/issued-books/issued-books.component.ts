import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from '../book.service';

export interface issuedBookData {
  name: string;
  libraryId: string;
  bookName: string;
  requestedDate: string | null;
  returnDate: string | null;
  objectId: string;
}

@Component({
  selector: 'app-issued-books',
  templateUrl: './issued-books.component.html',
  styleUrls: ['./issued-books.component.css'],
})
export class IssuedBooksComponent implements AfterViewInit, OnInit {
  issuedBooks: issuedBookData[] = [];
  displayedColumns: string[] = [
    'no',
    'name',
    'libraryId',
    'bookName',
    'issuedDate',
    'returnDate',
    'actions',
  ];
  dataSource!: MatTableDataSource<issuedBookData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private bookService: BookService) {
    this.dataSource = new MatTableDataSource<issuedBookData>([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.bookService.getAllIssuedBooks().subscribe(
      (books) => {
        console.log(books);
        this.issuedBooks = books;
        this.dataSource.data = this.issuedBooks;
      },
      (error) => {
        console.error('Error fetching requested books:', error);
      }
    );
  }

  return(row: any) {
    const objectId = row.objectId;
    const libraryId = row.libraryId;

    this.bookService.returnBook(objectId, libraryId).subscribe(
      () => {
        const index = this.issuedBooks.findIndex(
          (book) => book.objectId === objectId
        );

        if (index !== -1) {
          this.issuedBooks.splice(index, 1);
          this.dataSource.data = this.issuedBooks.slice();
        }
        console.log('Request accepted successfully for book:', objectId);
      },
      (error) => {
        console.error('Error accepting book request:', error);
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
