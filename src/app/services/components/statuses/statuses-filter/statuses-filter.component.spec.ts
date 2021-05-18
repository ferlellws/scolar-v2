import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusesFilterComponent } from './statuses-filter.component';

describe('StatusesFilterComponent', () => {
  let component: StatusesFilterComponent;
  let fixture: ComponentFixture<StatusesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusesFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
