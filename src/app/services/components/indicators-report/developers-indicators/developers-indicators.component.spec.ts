import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopersIndicatorsComponent } from './developers-indicators.component';

describe('DevelopersIndicatorsComponent', () => {
  let component: DevelopersIndicatorsComponent;
  let fixture: ComponentFixture<DevelopersIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevelopersIndicatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopersIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
