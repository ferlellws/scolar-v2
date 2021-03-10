import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagesFormComponent } from './stages-form.component';

describe('CompanyTypesFormComponent', () => {
  let component: StagesFormComponent;
  let fixture: ComponentFixture<StagesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StagesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
