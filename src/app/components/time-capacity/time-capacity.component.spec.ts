import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeCapacityComponent } from './time-capacity.component';

describe('TimeCapacityComponent', () => {
  let component: TimeCapacityComponent;
  let fixture: ComponentFixture<TimeCapacityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeCapacityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
