import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategicApproachesFormComponent } from './strategic-approaches-form.component';

describe('StrategicApproachesFormComponent', () => {
  let component: StrategicApproachesFormComponent;
  let fixture: ComponentFixture<StrategicApproachesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrategicApproachesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategicApproachesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
