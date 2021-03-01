import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementsFormComponent } from './managements-form.component';

describe('ManagementFormComponent', () => {
  let component: ManagementsFormComponent;
  let fixture: ComponentFixture<ManagementsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
