import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProgressCreateComponent } from './project-progress-create.component';

describe('ProjectProgressCreateComponent', () => {
  let component: ProjectProgressCreateComponent;
  let fixture: ComponentFixture<ProjectProgressCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectProgressCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProgressCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
