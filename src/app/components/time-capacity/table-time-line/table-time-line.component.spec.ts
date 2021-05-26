import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTimeLineComponent } from './table-time-line.component';

describe('TableTimeLineComponent', () => {
  let component: TableTimeLineComponent;
  let fixture: ComponentFixture<TableTimeLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableTimeLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTimeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
