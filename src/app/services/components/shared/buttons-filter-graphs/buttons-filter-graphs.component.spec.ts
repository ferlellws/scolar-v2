import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsFilterGraphsComponent } from './buttons-filter-graphs.component';

describe('ButtonsFilterGraphsComponent', () => {
  let component: ButtonsFilterGraphsComponent;
  let fixture: ComponentFixture<ButtonsFilterGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonsFilterGraphsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsFilterGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
