import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesByProjectComponent } from './companies-by-project.component';

describe('CompaniesByProjectComponent', () => {
  let component: CompaniesByProjectComponent;
  let fixture: ComponentFixture<CompaniesByProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniesByProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesByProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
