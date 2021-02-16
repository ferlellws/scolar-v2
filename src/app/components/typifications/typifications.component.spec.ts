import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypificationsComponent } from './typifications.component';

describe('TypificationsComponent', () => {
  let component: TypificationsComponent;
  let fixture: ComponentFixture<TypificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
