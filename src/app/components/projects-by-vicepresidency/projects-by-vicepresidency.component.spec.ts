import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsByVicepresidencyComponent } from './projects-by-vicepresidency.component';

describe('ProjectsByVicepresidencyComponent', () => {
  let component: ProjectsByVicepresidencyComponent;
  let fixture: ComponentFixture<ProjectsByVicepresidencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsByVicepresidencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsByVicepresidencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
