import { TestBed } from '@angular/core/testing';

import { ServicioentrevistaService } from './servicioentrevista.service';

describe('ServicioentrevistaService', () => {
  let service: ServicioentrevistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioentrevistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
