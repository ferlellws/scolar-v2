import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTimeFormBasicComponent } from './item-time-form-basic.component';

describe('ItemTimeFormBasicComponent', () => {
  let component: ItemTimeFormBasicComponent;
  let fixture: ComponentFixture<ItemTimeFormBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTimeFormBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTimeFormBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
