import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveredEditComponent } from './delivered-edit.component';

describe('DeliveredEditComponent', () => {
  let component: DeliveredEditComponent;
  let fixture: ComponentFixture<DeliveredEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveredEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveredEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
