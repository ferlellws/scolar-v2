import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesFormComponent } from './states-form.component';

describe('CompanyTypesFormComponent', () => {
  let component: StatesFormComponent;
  let fixture: ComponentFixture<StatesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
