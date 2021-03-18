import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralUsersComponent } from './general-users.component';

describe('GeneralUsersComponent', () => {
  let component: GeneralUsersComponent;
  let fixture: ComponentFixture<GeneralUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
