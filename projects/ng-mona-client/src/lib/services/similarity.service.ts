import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Commons } from '../commons';
import { SimilaritySearchRequest, SimilaritySearchResult } from '../model/similarity.model';

@Injectable({
  providedIn: 'root'
})
export class SimilarityService {

  constructor(private http: HttpClient, private commons: Commons) { }

  /**
   * get similar spectra
   * @param query request query object
   * @param size number of results to return
   */
  getSimilarityResults(query: SimilaritySearchRequest, size: number = 10): Observable<SimilaritySearchResult[]> {
    const params = new HttpParams().set('size', size.toString());

    return this.http.post<SimilaritySearchResult[]>(
      `${this.commons.apiURL}/rest/similarity/search`,
      query,
      this.commons.buildRequestOptions({params})
    ).pipe(catchError(this.commons.handleError));
  }
}
