import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralUsersFormComponent } from './general-users-form.component';

describe('GeneralUsersFormComponent', () => {
  let component: GeneralUsersFormComponent;
  let fixture: ComponentFixture<GeneralUsersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralUsersFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralUsersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
