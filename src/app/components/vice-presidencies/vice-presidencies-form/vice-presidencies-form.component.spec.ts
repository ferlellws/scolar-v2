import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VicePresidenciesFormComponent } from './vice-presidencies-form.component';

describe('VicePresidenciesFormComponent', () => {
  let component: VicePresidenciesFormComponent;
  let fixture: ComponentFixture<VicePresidenciesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VicePresidenciesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VicePresidenciesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
