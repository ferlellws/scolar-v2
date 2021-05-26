import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionPerformanceIndicatorsComponent } from './evolution-performance-indicators.component';

describe('EvolutionPerformanceIndicatorsComponent', () => {
  let component: EvolutionPerformanceIndicatorsComponent;
  let fixture: ComponentFixture<EvolutionPerformanceIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvolutionPerformanceIndicatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolutionPerformanceIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
