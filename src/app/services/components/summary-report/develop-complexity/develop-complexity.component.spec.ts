import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopComplexityComponent } from './develop-complexity.component';

describe('DevelopComplexityComponent', () => {
  let component: DevelopComplexityComponent;
  let fixture: ComponentFixture<DevelopComplexityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevelopComplexityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopComplexityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
