import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListingComponent } from '@shared';

describe('BookListingComponent', () => {
  let component: BookListingComponent;
  let fixture: ComponentFixture<BookListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookListingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
