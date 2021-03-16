import { TestBed } from '@angular/core/testing';

import { RegistrarvisitaService } from './registrarvisita.service';

describe('RegistrarvisitaService', () => {
  let service: RegistrarvisitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrarvisitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
