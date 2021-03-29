import { TestBed } from '@angular/core/testing';

import { EntrevistasService } from './entrevistas.service';

describe('EntrevistasService', () => {
  let service: EntrevistasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrevistasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
