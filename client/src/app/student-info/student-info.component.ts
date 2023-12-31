import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { interval } from 'rxjs';
import { CardService } from './../card.service';
import { UserService } from './../user.service';

export interface UserData {
  id: string;
  username: string;
  department: string;
  entryTime: Date | null;
  exitTime: Date | null;
  borrowDate: Date | null;
  returnDate: Date | null;
}

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css'],
})
export class StudentInfoComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'no',
    'id',
    'username',
    'department',
    'entryTime',
    'exitTime',
    'borrowDate',
    'returnDate',
  ];
  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private cardService: CardService
  ) {
    this.dataSource = new MatTableDataSource<UserData>([]);
  }

  card_data: any;
  sound_data: any;
  students: any;
  currentUsers: number = 0;

  ngOnInit() {
    let lastEntryId = this.cardService.getLastEntryId();

    interval(1000).subscribe(() => {
      this.cardService.getCardData().subscribe({
        next: (response) => {
          let currentEntryId = response.channel.last_entry_id;
          if (currentEntryId === null) currentEntryId = 0;

          if (currentEntryId > lastEntryId) {
            lastEntryId = currentEntryId;
            this.cardService.setLastEntryId(currentEntryId);

            const libraryId = response.feeds[0].field1;
            if (!libraryId)
              console.error('Error scanning card: Library ID is null');
            else {
              this.cardService.scanCard(libraryId).subscribe({
                next: (scanResponse) => {
                  console.log('Card scan response:', scanResponse);
                  this.getStudentDetails();
                },
                error: (scanError) => {
                  console.error('Error scanning card:', scanError);
                },
              });
            }
          }
        },
        error: (cardError) => {
          console.error('Error fetching card data:', cardError);
        },
      });

      this.cardService.getSoundData().subscribe({
        next: (response) => {
          this.sound_data = response.feeds[0].field2;
        },
        error: (error) => {
          console.error('Error in getting sound data:', error);
        },
      });
    });
    this.getStudentDetails();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getStudentDetails() {
    this.userService.getStudentsWithActivities().subscribe({
      next: (students) => {
        console.log(students);
        this.currentUsers = students.filter(
          (student: any) => student.activities[0]?.exitTime === null
        ).length;
        console.log(this.currentUsers);
        this.students = students.map((student: any) => ({
          id: student.libraryId,
          username: student.username,
          department: student.department,
          entryTime: student.activities[0]?.entryTime || null,
          exitTime: student.activities[0]?.exitTime || null,
          borrowDate: student.currentlyBorrowedBooks[0]?.borrowTime,
          returnDate: student.currentlyBorrowedBooks[0]?.returnTime,
        }));

        this.dataSource = new MatTableDataSource(this.students);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        console.log('Students with activities:', this.students);
      },
      error: (error) => {
        console.error('Error fetching student details:', error);
      },
    });
  }
  forgotToReturn(row: any): boolean {
    const returnDate = new Date(row.returnDate);
    const currentTime = new Date();
    return returnDate < currentTime;
  }
}
