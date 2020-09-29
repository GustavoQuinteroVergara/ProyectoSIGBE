import { TestBed } from '@angular/core/testing';

import { ServiciolistarticketService } from './serviciolistarticket.service';

describe('ServiciolistarticketService', () => {
  let service: ServiciolistarticketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciolistarticketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
