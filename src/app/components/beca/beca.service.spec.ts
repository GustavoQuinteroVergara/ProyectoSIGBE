import { TestBed } from '@angular/core/testing';

import { BecaService } from './beca.service';

describe('BecaService', () => {
  let service: BecaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BecaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
