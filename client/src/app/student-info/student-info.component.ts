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
  students: any;

  ngOnInit() {
    let lastEntryId = this.cardService.getLastEntryId();

    interval(1000).subscribe(() => {
      this.cardService.getCardData().subscribe({
        next: (response) => {
          let currentEntryId = response.channel.last_entry_id;

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
    });
    this.getStudentDetails();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getStudentDetails() {
    this.userService.getStudentsWithActivities().subscribe({
      next: (students) => {
        this.students = students.map((student: any) => ({
          id: student.libraryId,
          username: student.username,
          department: student.department,
          entryTime: student.activities[0]?.entryTime || null,
          exitTime: student.activities[0]?.exitTime || null,
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
}
