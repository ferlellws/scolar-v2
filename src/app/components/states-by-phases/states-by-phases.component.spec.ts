import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesByPhasesComponent } from './states-by-phases.component';

describe('StatesByPhasesComponent', () => {
  let component: StatesByPhasesComponent;
  let fixture: ComponentFixture<StatesByPhasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatesByPhasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatesByPhasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
