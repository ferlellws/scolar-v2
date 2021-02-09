import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCircleComponent } from './profile-circle.component';

describe('ProfileCircleComponent', () => {
  let component: ProfileCircleComponent;
  let fixture: ComponentFixture<ProfileCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCircleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
