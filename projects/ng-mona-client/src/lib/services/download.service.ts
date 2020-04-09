import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Commons } from '../commons';
import { PredefinedQuery, StaticDownload } from '../model/download.model';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient, private commons: Commons) { }

  /**
   * get predefined downloads
   */
  getPredefinedQueries(): Observable<PredefinedQuery[]> {
    return this.http.post<PredefinedQuery[]>(
      `${this.commons.apiURL}/rest/downloads/predefined`,
      this.commons.buildRequestOptions()
    ).pipe(catchError(this.commons.handleError));
  }

  /**
   * get static downloads
   */
  getStaticDownloads(): Observable<StaticDownload[]> {
    return this.http.post<StaticDownload[]>(
      `${this.commons.apiURL}/rest/downloads/static`,
      this.commons.buildRequestOptions()
    ).pipe(catchError(this.commons.handleError));
  }
}
