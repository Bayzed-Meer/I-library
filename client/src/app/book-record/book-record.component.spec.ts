import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRecordComponent } from './book-record.component';

describe('BookRecordComponent', () => {
  let component: BookRecordComponent;
  let fixture: ComponentFixture<BookRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookRecordComponent]
    });
    fixture = TestBed.createComponent(BookRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
