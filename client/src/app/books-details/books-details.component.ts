import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from '../book.service';

export interface BookDetails {
  title: string;
  author: string;
  edition: string;
  quantity: string;
  id: string;
}

@Component({
    selector: 'app-books-details',
    templateUrl: './books-details.component.html',
    styleUrls: ['./books-details.component.css'],
    standalone: false
})
export class BooksDetailsComponent implements AfterViewInit, OnInit {
  @Output() editClicked: EventEmitter<string> = new EventEmitter<string>();
  showEditBooksDetails: boolean = false;
  bookDetails: BookDetails[] = [];
  displayedColumns: string[] = [
    'no',
    'title',
    'author',
    'edition',
    'quantity',
    'actions',
  ];
  dataSource!: MatTableDataSource<BookDetails>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private bookService: BookService) {
    this.dataSource = new MatTableDataSource<BookDetails>([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.bookService.getAllBooks().subscribe(
      (response) => {
        this.bookDetails = response.map((book: any) => ({
          title: book.title,
          author: book.author,
          edition: book.edition,
          quantity: book.quantity,
          id: book._id,
        }));
        this.dataSource.data = this.bookDetails;
      },
      (error) => {
        console.error('Error fetching book details:', error);
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

  edit(row: any) {
    this.editClicked.emit(row.id);
  }

  delete(row: any) {
    const bookId = row.id;

    this.bookService.deleteBook(bookId).subscribe(
      (response) => {
        console.log(response.message);

        const index = this.dataSource.data.findIndex(
          (book) => book.id === bookId
        );

        if (index !== -1) {
          this.dataSource.data.splice(index, 1);

          this.dataSource._updateChangeSubscription();
        }
      },
      (error) => {
        console.error('Error deleting book:', error);
      }
    );
  }
}
