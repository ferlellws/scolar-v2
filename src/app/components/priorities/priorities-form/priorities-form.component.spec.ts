import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritiesFormComponent } from './priorities-form.component';

describe('PrioritiesFormComponent', () => {
  let component: PrioritiesFormComponent;
  let fixture: ComponentFixture<PrioritiesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrioritiesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioritiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
