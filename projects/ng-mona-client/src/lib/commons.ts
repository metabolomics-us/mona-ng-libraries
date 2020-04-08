import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { throwError } from 'rxjs';

@Injectable()
export class Commons {

  apiURL = 'https://mona.fiehnlab.ucdavis.edu';
  apiKey?: string;

  /**
   * set the global authentication token
   * @param apiKey authentication token
   */
  setAPIKey(apiKey: string) {
    console.log(`Setting API Key to ${apiKey}`);
    this.apiKey = apiKey;
  }

  /**
   * create http request options including authentication token
   * @param baseOptions optional base options to append
   */
  buildRequestOptions(baseOptions?) {
    const options = {
      headers: new HttpHeaders()
    };

    if (this.apiKey !== undefined) {
      options.headers = options.headers.append('Authorization', `Bearer ${this.apiKey}`);
    }

    // set base options
    if (baseOptions !== undefined) {
      Object.keys(baseOptions).forEach(k => options[k] = baseOptions[k]);
    }

    return options;
  }

  /**
   * handle http error
   * @param error server- or client-side error
   */
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      throwError(error.error.message);
    } else {
      // Get server-side error
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }
 }
}
