import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptCyclicalComponent } from './receipt-cyclical.component';

describe('ReceiptCyclicalComponent', () => {
  let component: ReceiptCyclicalComponent;
  let fixture: ComponentFixture<ReceiptCyclicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptCyclicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptCyclicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
