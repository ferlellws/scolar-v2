import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextListDateComponent } from './text-list-date.component';

describe('TextListDateComponent', () => {
  let component: TextListDateComponent;
  let fixture: ComponentFixture<TextListDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextListDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextListDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
