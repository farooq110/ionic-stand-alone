import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DailyPulsePage } from './daily-pulse.page';

describe('DailyPulsePage', () => {
  let component: DailyPulsePage;
  let fixture: ComponentFixture<DailyPulsePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DailyPulsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
