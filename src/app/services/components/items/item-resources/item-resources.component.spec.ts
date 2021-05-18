import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemResourcesComponent } from './item-resources.component';

describe('ItemResourcesComponent', () => {
  let component: ItemResourcesComponent;
  let fixture: ComponentFixture<ItemResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
