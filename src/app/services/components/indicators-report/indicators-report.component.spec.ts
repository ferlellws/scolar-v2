import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorsReportComponent } from './indicators-report.component';

describe('IndicatorsReportComponent', () => {
  let component: IndicatorsReportComponent;
  let fixture: ComponentFixture<IndicatorsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicatorsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
