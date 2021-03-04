import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProgressReportComponent } from './project-progress-report.component';

describe('ProjectProgressReportComponent', () => {
  let component: ProjectProgressReportComponent;
  let fixture: ComponentFixture<ProjectProgressReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectProgressReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProgressReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
