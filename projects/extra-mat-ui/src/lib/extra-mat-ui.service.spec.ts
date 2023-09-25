import { TestBed } from '@angular/core/testing';

import { ExtraMatUiService } from './extra-mat-ui.service';

describe('ExtraMatUiService', () => {
  let service: ExtraMatUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtraMatUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
