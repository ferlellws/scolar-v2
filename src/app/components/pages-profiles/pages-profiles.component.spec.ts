import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesProfilesComponent } from './pages-profiles.component';

describe('PagesProfilesComponent', () => {
  let component: PagesProfilesComponent;
  let fixture: ComponentFixture<PagesProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesProfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
