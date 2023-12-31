import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../user.service';

export interface usersDetails {
  name: string;
  libraryId: string;
  department: string;
  email: string | null;
  phoneNumber: string | null;
  currentlyBorrowedBooks: string;
  lastEntry: Date | null;
  lastExit: Date | null;
}

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css'],
})
export class UsersDetailsComponent implements AfterViewInit, OnInit {
  usersDetails: usersDetails[] = [];
  displayedColumns: string[] = [
    'no',
    'name',
    'libraryId',
    'department',
    'email',
    'phoneNumber',
    'currentlyBorrowedBooks',
    'lastEntry',
    'lastExit',
  ];
  dataSource!: MatTableDataSource<usersDetails>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService) {
    this.dataSource = new MatTableDataSource<usersDetails>([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.userService.getAllUsersDetails().subscribe(
      (response) => {
        console.log(response);
        this.usersDetails = response.map((user) => ({
          name: user.username,
          libraryId: user.libraryId,
          department: user.department,
          email: user.email,
          phoneNumber: user.phoneNumber,
          currentlyBorrowedBooks: user.currentlyBorrowedBooks.length.toString(),
          lastEntry: this.getLastEntryTime(user.activities),
          lastExit: this.getLastExitTime(user.activities),
        }));

        this.dataSource.data = this.usersDetails;
      },
      (error) => {
        console.error('Error fetching users details:', error);
      }
    );
  }

  getLastEntryTime(activities: any[]): Date | null {
    const lastEntry =
      activities.length > 0
        ? new Date(activities[activities.length - 1].entryTime)
        : null;
    return lastEntry && !isNaN(lastEntry.getTime()) ? lastEntry : null;
  }

  getLastExitTime(activities: any[]): Date | null {
    const lastExit =
      activities.length > 0 && activities[activities.length - 1].exitTime
        ? new Date(activities[activities.length - 1].exitTime)
        : null;

    return lastExit && !isNaN(lastExit.getTime()) ? lastExit : null;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
