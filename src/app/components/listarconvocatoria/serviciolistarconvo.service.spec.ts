import { TestBed } from '@angular/core/testing';

import { ServiciolistarconvoService } from './serviciolistarconvo.service';

describe('ServiciolistarconvoService', () => {
  let service: ServiciolistarconvoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciolistarconvoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
