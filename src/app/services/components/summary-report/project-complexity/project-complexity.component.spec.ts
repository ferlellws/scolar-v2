import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComplexityComponent } from './project-complexity.component';

describe('ProjectComplexityComponent', () => {
  let component: ProjectComplexityComponent;
  let fixture: ComponentFixture<ProjectComplexityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectComplexityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComplexityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
