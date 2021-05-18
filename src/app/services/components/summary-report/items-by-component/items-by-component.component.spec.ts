import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsByComponentComponent } from './items-by-component.component';

describe('ItemsByComponentComponent', () => {
  let component: ItemsByComponentComponent;
  let fixture: ComponentFixture<ItemsByComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsByComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsByComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
