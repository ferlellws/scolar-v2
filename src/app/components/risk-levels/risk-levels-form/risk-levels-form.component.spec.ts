import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskLevelsFormComponent } from './risk-levels-form.component';

describe('RiskLevelsFormComponent', () => {
  let component: RiskLevelsFormComponent;
  let fixture: ComponentFixture<RiskLevelsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskLevelsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskLevelsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
