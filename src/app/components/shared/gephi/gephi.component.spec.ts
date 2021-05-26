import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GephiComponent } from './gephi.component';

describe('GephiComponent', () => {
  let component: GephiComponent;
  let fixture: ComponentFixture<GephiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GephiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GephiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
