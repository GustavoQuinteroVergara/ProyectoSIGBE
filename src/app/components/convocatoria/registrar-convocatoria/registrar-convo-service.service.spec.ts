import { TestBed } from '@angular/core/testing';

import { RegistrarConvoServiceService } from './registrar-convo-service.service';

describe('RegistrarConvoServiceService', () => {
  let service: RegistrarConvoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrarConvoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
