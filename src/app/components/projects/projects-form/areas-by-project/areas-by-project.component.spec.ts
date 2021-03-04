import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasByProjectComponent } from './areas-by-project.component';

describe('AreasByProjectComponent', () => {
  let component: AreasByProjectComponent;
  let fixture: ComponentFixture<AreasByProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreasByProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasByProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
