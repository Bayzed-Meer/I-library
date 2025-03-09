import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverdueBooksFinesComponent } from '@features';

describe('OverdueBooksFinesComponent', () => {
  let component: OverdueBooksFinesComponent;
  let fixture: ComponentFixture<OverdueBooksFinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverdueBooksFinesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OverdueBooksFinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
