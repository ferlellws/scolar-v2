import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoremFormComponent } from './valorem.component';

describe('ValoremFormComponent', () => {
  let component: ValoremFormComponent;
  let fixture: ComponentFixture<ValoremFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValoremFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValoremFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
