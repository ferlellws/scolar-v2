import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsFormBasicComponent } from './items-form-basic.component';

describe('ItemsFormBasicComponent', () => {
  let component: ItemsFormBasicComponent;
  let fixture: ComponentFixture<ItemsFormBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsFormBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsFormBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
