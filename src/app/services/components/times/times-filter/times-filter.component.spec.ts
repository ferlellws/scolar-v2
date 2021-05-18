import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesFilterComponent } from './times-filter.component';

describe('TimesFilterComponent', () => {
  let component: TimesFilterComponent;
  let fixture: ComponentFixture<TimesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
