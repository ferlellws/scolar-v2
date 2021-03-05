import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsByProjectComponent } from './applications-by-project.component';

describe('ApplicationsByProjectComponent', () => {
  let component: ApplicationsByProjectComponent;
  let fixture: ComponentFixture<ApplicationsByProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationsByProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsByProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
