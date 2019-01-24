/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '../../../../node_modules/@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasicRestService {

  endpointUrl: String = 'http://localhost:8080/ods/api/v1';

  /* Default useremail and password*/
  private useremail = 'admin@adminland.com';
  private password = 'admin123';

  headerParams = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization' : ''
  };

  requestOptions = {
    headers: null
  };

  constructor(private http: HttpClient) {
    // this.updateLoginInformation(this.useremail, this.password);
    this.appendAuthorizationToHeaderParams(this.useremail, this.password);
    const newHeaders = new HttpHeaders(this.headerParams);
    this.requestOptions = {
      headers: newHeaders
    };
  }

  setEndpointUrl(url: string) {
    this.endpointUrl = url;
  }

  getUseremail() {
    return this.useremail;
  }

  updateLoginInformation(useremail: string, password: string) {
    this.useremail = useremail;
    this.password = password;
    this.appendAuthorizationToHeaderParams(useremail, password);
    this.requestOptions.headers = new HttpHeaders(this.headerParams);
  }

  appendAuthorizationToHeaderParams(name: string, password: string) {
    this.headerParams.Authorization = String('Basic ' + btoa(name + ':' + password));
  }

  get(url: string): Observable<any> {
    return this.http.get(this.endpointUrl + url, this.requestOptions)
      .pipe(catchError(this.handleError));
  }

  post(url: string, data: any): Observable<any> {
    return this.http.post(this.endpointUrl + url, data, this.requestOptions)
      .pipe(catchError(this.handleError));
  }

  put(url: string, data: any): Observable<any> {
    return this.http.put(this.endpointUrl + url, data, this.requestOptions)
      .pipe(catchError(this.handleError));
  }

  delete(url: string) {
    return this.http.delete(this.endpointUrl + url, this.requestOptions)
      .pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    console.log('error: ');
    console.log(error);
    return error;
  }
}
