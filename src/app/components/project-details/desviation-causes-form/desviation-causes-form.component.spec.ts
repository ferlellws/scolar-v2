import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesviationCausesFormComponent } from './desviation-causes-form.component';

describe('DesviationCausesFormComponent', () => {
  let component: DesviationCausesFormComponent;
  let fixture: ComponentFixture<DesviationCausesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesviationCausesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesviationCausesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
