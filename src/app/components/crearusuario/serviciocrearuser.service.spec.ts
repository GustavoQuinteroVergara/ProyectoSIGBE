import { TestBed } from '@angular/core/testing';

import { ServiciocrearuserService } from './serviciocrearuser.service';

describe('ServiciocrearuserService', () => {
  let service: ServiciocrearuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciocrearuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
