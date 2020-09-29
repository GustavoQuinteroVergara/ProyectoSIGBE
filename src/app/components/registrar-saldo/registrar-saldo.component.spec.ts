import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarSaldoComponent } from './registrar-saldo.component';

describe('RegistrarSaldoComponent', () => {
  let component: RegistrarSaldoComponent;
  let fixture: ComponentFixture<RegistrarSaldoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarSaldoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarSaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
