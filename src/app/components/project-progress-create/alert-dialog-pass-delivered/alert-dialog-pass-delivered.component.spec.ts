import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertConfirmPassDeliveredComponent } from './alert-dialog-pass-delivered.component';

describe('AlertDialogComponent', () => {
  let component: AlertConfirmPassDeliveredComponent;
  let fixture: ComponentFixture<AlertConfirmPassDeliveredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertConfirmPassDeliveredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertConfirmPassDeliveredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
