import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsDeleteWarningComponent } from './projects-delete-warning.component';

describe('ProjectsDeleteWarningComponent', () => {
  let component: ProjectsDeleteWarningComponent;
  let fixture: ComponentFixture<ProjectsDeleteWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsDeleteWarningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsDeleteWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
