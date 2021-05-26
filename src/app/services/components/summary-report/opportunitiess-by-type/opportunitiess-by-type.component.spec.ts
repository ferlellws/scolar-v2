import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitiessByTypeComponent } from './opportunitiess-by-type.component';

describe('OpportunitiessByTypeComponent', () => {
  let component: OpportunitiessByTypeComponent;
  let fixture: ComponentFixture<OpportunitiessByTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunitiessByTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitiessByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
