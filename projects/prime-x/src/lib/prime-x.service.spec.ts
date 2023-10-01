import { TestBed } from '@angular/core/testing';

import { PrimeXService } from './prime-x.service';

describe('PrimeXService', () => {
  let service: PrimeXService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimeXService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
