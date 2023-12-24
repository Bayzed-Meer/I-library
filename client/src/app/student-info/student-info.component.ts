import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
    'id',
    'username',
    'department',
    'entryTime',
    'exitTime',
  ];
  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService) {}

  card_data: any;
  students: any;

  ngOnInit() {
    this.userService.getCardData().subscribe((response) => {
      this.card_data = response;
      const libraryId = this.card_data.feeds[0].field1;
      this.userService.scanCard(libraryId).subscribe((response) => {
        console.log('Card scan response:', response);

        this.userService.getStudentsWithActivities().subscribe((students) => {
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
        });
      });
    });
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
}
