import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComiteResourceFormComponent } from './comite-resource-form.component';

describe('ComiteResourceFormComponent', () => {
  let component: ComiteResourceFormComponent;
  let fixture: ComponentFixture<ComiteResourceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComiteResourceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComiteResourceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
