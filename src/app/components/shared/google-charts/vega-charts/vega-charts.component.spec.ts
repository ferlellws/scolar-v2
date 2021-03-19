import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VegaChartsComponent } from './vega-charts.component';


describe('VegaChartsComponent', () => {
  let component: VegaChartsComponent;
  let fixture: ComponentFixture<VegaChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VegaChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VegaChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
