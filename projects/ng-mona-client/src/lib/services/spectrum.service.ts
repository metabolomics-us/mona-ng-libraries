import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Commons } from '../commons';
import { Spectrum } from '../model/spectrum.model';

@Injectable({
  providedIn: 'root'
})
export class SpectrumService {

  constructor(private http: HttpClient, private commons: Commons) { }

  /**
   * get a single spectrum by id
   * @param id spectrum id
   */
  get(id: string): Observable<Spectrum> {
    return this.http.get<Spectrum>(`${this.commons.apiURL}/rest/spectra/${id}`, this.commons.buildRequestOptions())
      .pipe(catchError(this.commons.handleError));
  }

  /**
   * list spectra from the api
   * @param query optional rsql query
   * @param page optional page number
   * @param pageSize required page size
   */
  list(query?: string, page?: number, pageSize: number = 10): Observable<Spectrum[]> {
    let url = `${this.commons.apiURL}/rest/spectra?size=${pageSize}`;

    if (page !== undefined) {
      url += `&page=${page}`;
    }

    if (query !== undefined) {
      url += `&query=${query}`;
    }

    return this.http.get<Spectrum[]>(url, this.commons.buildRequestOptions())
      .pipe(catchError(this.commons.handleError));
  }

  /**
   * get spectrum count
   * @param query optional rsql query
   */
  count(query?: string) {
    const url = (query === undefined) ?
      `${this.commons.apiURL}/rest/spectra/count` :
      `${this.commons.apiURL}/rest/spectra/search/count?query=${query}`;

    return this.http.get(url, this.commons.buildRequestOptions({responseType: 'text'}))
      .pipe(
        map((result: string) => parseInt(result, 10)),
        catchError(this.commons.handleError)
      );
  }

  /**
   * upload a spectrum
   * @param spectrum spectrum object
   */
  add(spectrum: Spectrum): Observable<Spectrum> {
    return this.http.post<Spectrum>(
      `${this.commons.apiURL}/rest/spectra`,
      spectrum,
      this.commons.buildRequestOptions()
    ).pipe(catchError(this.commons.handleError));
  }

  /**
   * upload/replace a spectrum to the given id
   * @param spectrum spectrum object
   * @param id new spectrum id
   */
  update(spectrum: Spectrum, id: string): Observable<Spectrum> {
    return this.http.put<Spectrum>(
      `${this.commons.apiURL}/rest/spectra/${id}`,
      spectrum,
      this.commons.buildRequestOptions()
    ).pipe(catchError(this.commons.handleError));
  }

  /**
   * delete spectrum with the given id
   * @param id spectrum id
   */
  delete(id: string) {
    return this.http.delete<Spectrum>(
      `${this.commons.apiURL}/rest/spectra/${id}`,
      this.commons.buildRequestOptions()
    ).pipe(catchError(this.commons.handleError));
  }
}
