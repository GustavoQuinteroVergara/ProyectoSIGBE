import { TestBed } from '@angular/core/testing';

import { ServRegPostuService } from './serv-reg-postu.service';

describe('ServRegPostuService', () => {
  let service: ServRegPostuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServRegPostuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
