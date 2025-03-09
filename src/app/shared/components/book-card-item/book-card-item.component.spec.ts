import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCardItemComponent } from '@shared';

describe('BookCardItemComponent', () => {
  let component: BookCardItemComponent;
  let fixture: ComponentFixture<BookCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCardItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
