import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterrelationsFormComponent } from './interrelations-form.component';

describe('InterrelationsFormComponent', () => {
  let component: InterrelationsFormComponent;
  let fixture: ComponentFixture<InterrelationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterrelationsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterrelationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
