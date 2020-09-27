import { TestBed } from '@angular/core/testing';

import { ServicioshabilitarService } from './servicioshabilitar.service';

describe('ServicioshabilitarService', () => {
  let service: ServicioshabilitarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioshabilitarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
