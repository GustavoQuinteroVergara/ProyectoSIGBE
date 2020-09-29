import { TestBed } from '@angular/core/testing';

import { RegistrarSaldoService } from './registrar-saldo.service';

describe('RegistrarSaldoService', () => {
  let service: RegistrarSaldoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrarSaldoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
