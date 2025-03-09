import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingHistoryComponent } from '@features';

describe('BorrowingHistoryComponent', () => {
  let component: BorrowingHistoryComponent;
  let fixture: ComponentFixture<BorrowingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowingHistoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BorrowingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
