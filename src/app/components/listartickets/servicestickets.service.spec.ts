import { TestBed } from '@angular/core/testing';

import { ServicesticketsService } from './servicestickets.service';

describe('ServicesticketsService', () => {
  let service: ServicesticketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesticketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
