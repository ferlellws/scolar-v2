import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityBehaviorComponent } from './opportunity-behavior.component';

describe('OpportunityBehaviorComponent', () => {
  let component: OpportunityBehaviorComponent;
  let fixture: ComponentFixture<OpportunityBehaviorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityBehaviorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityBehaviorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
