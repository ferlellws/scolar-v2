import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeIndicatorsChartComponent } from './home-indicators-chart.component';

describe('HomeIndicatorsChartComponent', () => {
  let component: HomeIndicatorsChartComponent;
  let fixture: ComponentFixture<HomeIndicatorsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeIndicatorsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeIndicatorsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
