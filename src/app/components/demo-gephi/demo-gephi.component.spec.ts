import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoGephiComponent } from './demo-gephi.component';

describe('DemoGephiComponent', () => {
  let component: DemoGephiComponent;
  let fixture: ComponentFixture<DemoGephiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoGephiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoGephiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
