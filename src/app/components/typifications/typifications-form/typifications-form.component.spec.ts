import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypificationsFormComponent } from './typifications-form.component';

describe('TypificationsFormComponent', () => {
  let component: TypificationsFormComponent;
  let fixture: ComponentFixture<TypificationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypificationsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypificationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
