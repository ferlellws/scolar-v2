import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesByPhasesFormComponent } from './states-by-phases-form.component';

describe('CompanyTypesFormComponent', () => {
  let component: StatesByPhasesFormComponent;
  let fixture: ComponentFixture<StatesByPhasesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatesByPhasesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatesByPhasesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
