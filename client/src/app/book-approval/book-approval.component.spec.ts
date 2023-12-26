import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookApprovalComponent } from './book-approval.component';

describe('BookApprovalComponent', () => {
  let component: BookApprovalComponent;
  let fixture: ComponentFixture<BookApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookApprovalComponent]
    });
    fixture = TestBed.createComponent(BookApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
