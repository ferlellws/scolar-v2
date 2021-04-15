import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverdueFormComponent } from './overdue-form.component';

describe('OverdueFormComponent', () => {
  let component: OverdueFormComponent;
  let fixture: ComponentFixture<OverdueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverdueFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverdueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
