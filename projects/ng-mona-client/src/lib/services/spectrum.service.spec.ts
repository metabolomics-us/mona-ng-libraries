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

  it('should get a count for a query', async(() => {
    service.count(`metaData=q='name=="precursor type" and value=="[M+H]+"'`).subscribe(
      response => {
        expect(response).toBeGreaterThan(0);
      },
      (error: HttpErrorResponse) =>
        fail(JSON.stringify(error))
    );
  }));

  it('should get a spectrum', async(() => {
    service.list('', '', 0, 1).subscribe(
      (response: Spectrum[]) => {
        expect(response.length).toEqual(1);
      },
      (error: HttpErrorResponse) =>
        fail(JSON.stringify(error))
    );
  }));

  it('should execute a simple tag query', async(() => {
    service.list(`tags.text=="LC-MS"`, '', 0, 1).subscribe(
      (response: Spectrum[]) => {
        expect(response.length).toEqual(1);
        expect(response[0].tags.map(x => x.text)).toContain('LC-MS');
      },
      (error: HttpErrorResponse) =>
        fail(JSON.stringify(error))
    );
  }));

  it('should execute a simple metadata query', async(() => {
    service.list(`metaData=q='name=="ms level" and value=="MS2"'`, '', 0, 1).subscribe(
      (response: Spectrum[]) => {
        expect(response.length).toEqual(1);

        const metaData = response[0].metaData.filter(x => x.name === 'ms level');
        expect(metaData.length).toEqual(1);
        expect(metaData[0].value).toEqual('MS2');
      },
      (error: HttpErrorResponse) =>
        fail(JSON.stringify(error))
    );
  }));

  it('should execute a metadata query with special characters', async(() => {
    service.list(`metaData=q='name=="precursor type" and value=="[M+H]+"'`, '', 0, 1).subscribe(
      (response: Spectrum[]) => {
        expect(response.length).toEqual(1);

        const metaData = response[0].metaData.filter(x => x.name === 'precursor type');
        expect(metaData.length).toEqual(1);
        expect(metaData[0].value).toEqual('[M+H]+');
      },
      (error: HttpErrorResponse) =>
        fail(JSON.stringify(error))
    );
  }));
});
