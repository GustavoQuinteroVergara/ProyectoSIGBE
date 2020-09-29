import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPostulacionComponent } from './registrar-postulacion.component';

describe('RegistrarPostulacionComponent', () => {
  let component: RegistrarPostulacionComponent;
  let fixture: ComponentFixture<RegistrarPostulacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarPostulacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarPostulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
