import { TestBed } from '@angular/core/testing';

import { SpectrumQueryService } from './spectrum-query.service';

describe('SpectrumQueryService', () => {
  let service: SpectrumQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpectrumQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
