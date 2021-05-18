import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOpportunitiessComponent } from './delivery-opportunitiess.component';

describe('DeliveryOpportunitiessComponent', () => {
  let component: DeliveryOpportunitiessComponent;
  let fixture: ComponentFixture<DeliveryOpportunitiessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryOpportunitiessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryOpportunitiessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
