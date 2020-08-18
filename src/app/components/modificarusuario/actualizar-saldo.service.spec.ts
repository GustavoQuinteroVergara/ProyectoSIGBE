import { TestBed } from '@angular/core/testing';

import { ActualizarSaldoService } from './actualizar-saldo.service';

describe('ActualizarSaldoService', () => {
  let service: ActualizarSaldoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActualizarSaldoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
