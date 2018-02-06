import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateSummaryComponent } from './date-summary.component';

describe('DateSummaryComponent', () => {
  let component: DateSummaryComponent;
  let fixture: ComponentFixture<DateSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
