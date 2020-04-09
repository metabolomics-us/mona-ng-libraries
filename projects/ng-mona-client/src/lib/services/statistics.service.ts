import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Commons } from '../commons';
import { TagStatistics, GlobalStatistics, MetaDataStatistics, CompoundClassStatistics, SubmitterStatistics } from '../model/statistics.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient, private commons: Commons) { }

  /**
   * get most recent global statistics
   */
  getGlobalStatistics(): Observable<GlobalStatistics> {
    return this.http.get<GlobalStatistics>(
      `${this.commons.apiURL}/rest/statistics/global`,
      this.commons.buildRequestOptions()
    ).pipe(catchError(this.commons.handleError));
  }

  /**
   * get statistics on all tags
   */
  getTags(): Observable<TagStatistics[]> {
    return this.http.get<TagStatistics[]>(
      `${this.commons.apiURL}/rest/tags`,
      this.commons.buildRequestOptions()
    ).pipe(catchError(this.commons.handleError));
  }

  /**
   * get library tags and statistics
   */
  getLibraryTags(): Observable<TagStatistics[]> {
    return this.http.get<TagStatistics[]>(
      `${this.commons.apiURL}/rest/tags/library`,
      this.commons.buildRequestOptions()
    ).pipe(catchError(this.commons.handleError));
  }

  /**
   * get compound class statistics
   */
  getCompoundClassStatistics(): Observable<CompoundClassStatistics[]> {
    return this.http.get<CompoundClassStatistics[]>(
      `${this.commons.apiURL}/rest/statistics/compoundClasses`,
      this.commons.buildRequestOptions()
    ).pipe(catchError(this.commons.handleError));
  }

  /**
   * get submitter statistics
   */
  getSubmitterStatistics(): Observable<SubmitterStatistics[]> {
    return this.http.get<SubmitterStatistics[]>(
      `${this.commons.apiURL}/rest/statistics/submitters`,
      this.commons.buildRequestOptions()
    ).pipe(catchError(this.commons.handleError));
  }


  /**
   * get all metadata statistics
   */
  getMetaDataStatistics(): Observable<MetaDataStatistics[]> {
    return this.http.get<MetaDataStatistics[]>(
      `${this.commons.apiURL}/rest/statistics/metaData`,
      this.commons.buildRequestOptions()
    ).pipe(catchError(this.commons.handleError));
  }

  /**
   * get a list of unique spectrum-level metadata names
   * @param search partial-string filter for metadata name results
   */
  getMetaDataNames(search?: string): Observable<MetaDataStatistics[]> {
    // add search options if provided
    const baseOptions = {params: new HttpParams()};

    if (search !== undefined) {
      baseOptions.params = new HttpParams().set('search', search);
    }

    return this.http.get<MetaDataStatistics[]>(
      `${this.commons.apiURL}/rest/metaData/names`,
      this.commons.buildRequestOptions(baseOptions)
    ).pipe(catchError(this.commons.handleError));
  }

  /**
   * get a list of spectrum-level metadata values for the given metadata name
   * @param name exact metadata name
   * @param search partial-string filter for metadata value results
   */
  getMetaDataValues(name: string, search?: string): Observable<MetaDataStatistics[]> {
    // add metadata name search options if provided
    const baseOptions: any = {
      params: new HttpParams().set('name', name)
    };

    if (search !== undefined) {
      baseOptions.params = baseOptions.params.set('search', search);
    }

    return this.http.get<MetaDataStatistics[]>(
      `${this.commons.apiURL}/rest/metaData/values`,
      this.commons.buildRequestOptions(baseOptions)
    ).pipe(catchError(this.commons.handleError));
  }
}
