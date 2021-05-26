import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationResourcesComponent } from './operation-resources.component';

describe('OperationResourcesComponent', () => {
  let component: OperationResourcesComponent;
  let fixture: ComponentFixture<OperationResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
