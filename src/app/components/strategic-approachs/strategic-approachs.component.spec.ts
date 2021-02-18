import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategicApproachsComponent } from './strategic-approachs.component';

describe('StrategicApproachsComponent', () => {
  let component: StrategicApproachsComponent;
  let fixture: ComponentFixture<StrategicApproachsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrategicApproachsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategicApproachsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
