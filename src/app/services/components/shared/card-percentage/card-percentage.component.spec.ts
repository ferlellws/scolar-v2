import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPercentageComponent } from './card-percentage.component';

describe('CardPercentageComponent', () => {
  let component: CardPercentageComponent;
  let fixture: ComponentFixture<CardPercentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPercentageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
