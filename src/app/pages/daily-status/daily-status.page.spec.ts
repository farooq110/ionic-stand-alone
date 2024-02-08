import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DailyStatusPage } from './daily-status.page';

describe('DailyStatusPage', () => {
  let component: DailyStatusPage;
  let fixture: ComponentFixture<DailyStatusPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DailyStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
