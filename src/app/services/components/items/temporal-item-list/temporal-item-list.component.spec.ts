import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporalItemListComponent } from './temporal-item-list.component';

describe('TemporalItemListComponent', () => {
  let component: TemporalItemListComponent;
  let fixture: ComponentFixture<TemporalItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemporalItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporalItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
