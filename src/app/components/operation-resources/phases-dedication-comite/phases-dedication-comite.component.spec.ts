import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasesDedicationComiteComponent } from './phases-dedication-comite.component';

describe('PhasesDedicationComiteComponent', () => {
  let component: PhasesDedicationComiteComponent;
  let fixture: ComponentFixture<PhasesDedicationComiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhasesDedicationComiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhasesDedicationComiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
