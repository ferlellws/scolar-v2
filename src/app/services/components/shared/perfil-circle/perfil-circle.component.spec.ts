import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilCircleComponent } from './perfil-circle.component';

describe('PerfilCircleComponent', () => {
  let component: PerfilCircleComponent;
  let fixture: ComponentFixture<PerfilCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilCircleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
