import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Commons } from '../commons';
import { AuthToken, LoginInfo, User } from '../model/auth.model';
import { Submitter } from '../model/spectrum.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private commons: Commons) { }

  /**
   * login using credentials to receive an authorization token
   * @param username MoNA username
   * @param password MoNA password
   */
  login(username: string, password: string): Observable<string> {
    return this.http.post<AuthToken>(
      `${this.commons.apiURL}/rest/auth/login`,
      {username, password}
    ).pipe(
      map((response: AuthToken) => {
        this.commons.setAPIKey(response.token);
        return response.token;
      }),
      catchError(this.commons.handleError)
    );
  }

  /**
   * retrieve information about the given authorization token
   * @param token current token
   */
  info(token: string): Observable<LoginInfo> {
    return this.http.post<LoginInfo>(
      `${this.commons.apiURL}/rest/auth/info`,
      new AuthToken(token),
      this.commons.buildRequestOptions()
    ).pipe(catchError(this.commons.handleError));
  }

  /**
   * extends validity of the given token
   * @param token current token
   */
  extend(token: string): Observable<string> {
    return this.http.post<AuthToken>(
      `${this.commons.apiURL}/rest/auth/extend`,
      new AuthToken(token),
      this.commons.buildRequestOptions()
    ).pipe(
      map((response: AuthToken) => {
        this.commons.setAPIKey(response.token);
        return response.token;
      }),
      catchError(this.commons.handleError)
    );
  }

  /**
   * create a new user account with the given credentials
   * @param user user object
   */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.commons.apiURL}/rest/users`, user)
      .pipe(catchError(this.commons.handleError));
  }

  /**
   * get information for a single submitter
   * @param id submitter id
   */
  getSubmitter(id: string): Observable<Submitter> {
    return this.http.post<Submitter>(
      `${this.commons.apiURL}/rest/auth/info`,
      this.commons.buildRequestOptions()
    ).pipe(catchError(this.commons.handleError));
  }

  /**
   * create a new submitter with the given credentials
   * @param user user object
   */
  addSubmitter(submitter: Submitter): Observable<Submitter> {
    return this.http.post<Submitter>(
      `${this.commons.apiURL}/rest/submitters`,
      submitter,
      this.commons.buildRequestOptions()
    ).pipe(catchError(this.commons.handleError));
  }

  /**
   * combine functions into a single registration method
   * @param emailAddress email address
   * @param password password
   * @param firstName first name
   * @param lastName last name
   * @param institution institution
   */
  registerUser(emailAddress: string, password: string, firstName: string, lastName: string, institution: string): Observable<Submitter> {
    // create user and submitter objects
    const user = new User(emailAddress, password);
    const submitter = new Submitter(emailAddress, firstName, lastName, institution);

    // use chained calls to create the MoNA user, login, and finally create a submitter profile
    return this.addUser(user).pipe(
      mergeMap(_ => this.login(emailAddress, password)),
      mergeMap(_ => this.addSubmitter(submitter))
    );
  }
}
