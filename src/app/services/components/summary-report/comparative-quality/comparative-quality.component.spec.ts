import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparativeQualityComponent } from './comparative-quality.component';

describe('ComparativeQualityComponent', () => {
  let component: ComparativeQualityComponent;
  let fixture: ComponentFixture<ComparativeQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparativeQualityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparativeQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
