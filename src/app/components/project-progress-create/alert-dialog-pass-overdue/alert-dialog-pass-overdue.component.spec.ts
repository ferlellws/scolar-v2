import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertConfirmPassOverdueComponent } from './alert-dialog-pass-overdue.component';

describe('AlertConfirmPassOverdueComponent', () => {
  let component: AlertConfirmPassOverdueComponent;
  let fixture: ComponentFixture<AlertConfirmPassOverdueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertConfirmPassOverdueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertConfirmPassOverdueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
