import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTimeListComponent } from './item-time-list.component';

describe('ItemTimeListComponent', () => {
  let component: ItemTimeListComponent;
  let fixture: ComponentFixture<ItemTimeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTimeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
