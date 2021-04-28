import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { Commons } from '../commons';
import { SimilarityService } from './similarity.service';
import { SimilaritySearchRequest } from '../model/similarity.model';

describe('SimilarityService', () => {
  let service: SimilarityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ Commons ]
    });
    service = TestBed.inject(SimilarityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform a simple similarity search request', waitForAsync(() => {
    const request = new SimilaritySearchRequest('100:1');

    service.getSimilarityResults(request, 1).subscribe(
      response => {
        console.log(response);
        expect(response.length).toBe(1);
        expect(response[0].hit).toBeDefined();
        expect(response[0].score).toBeGreaterThan(0);
      },
      (error: HttpErrorResponse) =>
        fail(JSON.stringify(error))
    );
  }));
});
