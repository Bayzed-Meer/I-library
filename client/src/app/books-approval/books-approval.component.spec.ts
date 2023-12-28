import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksApprovalComponent } from './books-approval.component';

describe('BooksApprovalComponent', () => {
  let component: BooksApprovalComponent;
  let fixture: ComponentFixture<BooksApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksApprovalComponent]
    });
    fixture = TestBed.createComponent(BooksApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
