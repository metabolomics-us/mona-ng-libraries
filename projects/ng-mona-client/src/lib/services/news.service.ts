import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Commons } from '../commons';
import { NewsEntry } from '../model/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient, private commons: Commons) { }

  /**
   * get news entries
   */
  getNewsEntries(): Observable<NewsEntry[]> {
    return this.http.get<NewsEntry[]>(
      `${this.commons.apiURL}/rest/news`,
      this.commons.buildRequestOptions()
    ).pipe(catchError(this.commons.handleError));
  }

  /**
   * add a news entry
   */
  addNewsEntry(news: NewsEntry): Observable<NewsEntry> {
    // add current timestamp to news entry
    news.date = new Date();

    return this.http.post<NewsEntry>(
      `${this.commons.apiURL}/rest/news`,
      news,
      this.commons.buildRequestOptions()
    ).pipe(catchError(this.commons.handleError));
  }
}
