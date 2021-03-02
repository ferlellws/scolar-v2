import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasFormComponent } from './areas-form.component';

describe('CompanyTypesFormComponent', () => {
  let component: AreasFormComponent;
  let fixture: ComponentFixture<AreasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreasFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
