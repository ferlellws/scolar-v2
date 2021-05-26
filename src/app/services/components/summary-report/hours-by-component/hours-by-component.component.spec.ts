import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursByComponentComponent } from './hours-by-component.component';

describe('HoursByComponentComponent', () => {
  let component: HoursByComponentComponent;
  let fixture: ComponentFixture<HoursByComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoursByComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoursByComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
