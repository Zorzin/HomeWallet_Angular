import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopEditDialogComponent } from './shop-edit-dialog.component';

describe('ShopEditDialogComponent', () => {
  let component: ShopEditDialogComponent;
  let fixture: ComponentFixture<ShopEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
