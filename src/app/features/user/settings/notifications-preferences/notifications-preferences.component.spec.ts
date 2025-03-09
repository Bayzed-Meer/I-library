import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsPreferencesComponent } from '@features';

describe('NotificationsPreferencesComponent', () => {
  let component: NotificationsPreferencesComponent;
  let fixture: ComponentFixture<NotificationsPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsPreferencesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
