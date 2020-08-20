import { TestBed } from '@angular/core/testing';

import { ServicesViewConvocatoriaService } from './services-view-convocatoria.service';

describe('ServicesViewConvocatoriaService', () => {
  let service: ServicesViewConvocatoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesViewConvocatoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
