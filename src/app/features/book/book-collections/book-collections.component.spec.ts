import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCollectionsComponent } from '@features';

describe('BookCollectionsComponent', () => {
  let component: BookCollectionsComponent;
  let fixture: ComponentFixture<BookCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCollectionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
