import { TestBed } from '@angular/core/testing';

import { TipobecaService } from './tipobeca.service';

describe('TipobecaService', () => {
  let service: TipobecaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipobecaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
