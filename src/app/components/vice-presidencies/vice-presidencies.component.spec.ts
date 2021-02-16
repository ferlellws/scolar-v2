import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VicePresidenciesComponent } from './vice-presidencies.component';

describe('VicePresidenciesComponent', () => {
  let component: VicePresidenciesComponent;
  let fixture: ComponentFixture<VicePresidenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VicePresidenciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VicePresidenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
