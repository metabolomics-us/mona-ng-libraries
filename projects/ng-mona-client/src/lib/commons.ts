import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpParameterCodec, HttpParams } from '@angular/common/http';

import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
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
      headers: new HttpHeaders(),
      params: new HttpParams({encoder: new CustomUrlEncoder()})
    };

    if (this.apiKey !== undefined) {
      options.headers = options.headers.append('Authorization', `Bearer ${this.apiKey}`);
    }

    // set base options
    if (baseOptions !== undefined) {
      Object.keys(baseOptions).forEach(o => {
        if (o === 'params') {
          // handle parameters separately and handle potentially multiple values per param
          baseOptions.params.keys().forEach(k => {
            baseOptions.params.getAll(k).forEach(v => options.params = options.params.append(k, v));
          });
        } else {
          options[o] = baseOptions[o];
        }
      });
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

/**
 * custom encoder for handling encoding of url query parameters by avoiding angular's
 * standardEncoding which un-encodes certain special characters
 *
 * https://github.com/angular/angular/issues/18261#issuecomment-338354119
 * https://github.com/angular/angular/blob/master/packages/common/http/src/params.ts
 */
export class CustomUrlEncoder implements HttpParameterCodec {

  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
