import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTypesFormComponent } from './company-types-form.component';

describe('CompanyTypesFormComponent', () => {
  let component: CompanyTypesFormComponent;
  let fixture: ComponentFixture<CompanyTypesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyTypesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTypesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
