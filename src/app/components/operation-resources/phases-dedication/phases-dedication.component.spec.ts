import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasesDedicationComponent } from './phases-dedication.component';

describe('PhasesDedicationComponent', () => {
  let component: PhasesDedicationComponent;
  let fixture: ComponentFixture<PhasesDedicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhasesDedicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhasesDedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
