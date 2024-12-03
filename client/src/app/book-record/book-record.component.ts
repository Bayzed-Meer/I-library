import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from '../book.service';

export interface bookHistory {
  name: string;
  libraryId: string;
  bookName: string;
  requestedDate: string | null;
  returnDate: string | null;
  objectId: string;
}

@Component({
    selector: 'app-book-record',
    templateUrl: './book-record.component.html',
    styleUrls: ['./book-record.component.css'],
    standalone: false
})
export class BookRecordComponent implements AfterViewInit, OnInit {
  bookHistory: bookHistory[] = [];
  displayedColumns: string[] = [
    'no',
    'name',
    'libraryId',
    'bookName',
    'issuedDate',
    'returnDate',
  ];
  dataSource!: MatTableDataSource<bookHistory>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private bookService: BookService) {
    this.dataSource = new MatTableDataSource<bookHistory>([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.bookService.getAllbookHistory().subscribe(
      (books) => {
        console.log(books);
        this.bookHistory = books;
        this.dataSource.data = this.bookHistory;
      },
      (error) => {
        console.error('Error fetching requested books:', error);
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
