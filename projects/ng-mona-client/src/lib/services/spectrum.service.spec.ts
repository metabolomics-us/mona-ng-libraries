import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';

import { Commons } from '../commons';
import { SpectrumService } from './spectrum.service';
import { Spectrum } from '../model/spectrum.model';

describe('SpectrumService', () => {
  let service: SpectrumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ Commons ]
    });
    service = TestBed.inject(SpectrumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a count for all spectra', async(() => {
    service.count().subscribe(
      response => {
        expect(response).toBeGreaterThan(0);
      },
      (error: HttpErrorResponse) =>
        fail(JSON.stringify(error))
    );
  }));

  it('should get a spectrum', async(() => {
    service.list('', 0, 1).subscribe(
      (response: Spectrum[]) => {
        expect(response.length).toEqual(1);
      },
      (error: HttpErrorResponse) =>
        fail(JSON.stringify(error))
    );
  }));
});
