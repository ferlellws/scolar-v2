import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesviationCausesComponent } from './desviation-causes.component';

describe('DesviationCausesComponent', () => {
  let component: DesviationCausesComponent;
  let fixture: ComponentFixture<DesviationCausesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesviationCausesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesviationCausesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
