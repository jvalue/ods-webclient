/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '../../../../node_modules/@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ConfigService} from './config.service';
import {V1RestService} from './v1-rest.service';
import {V2RestService} from './v2-rest.service';
import {AbstractRestService} from './abstract-rest.service';

@Injectable({
  providedIn: 'root'
})
export class BasicRestService {

  odsBaseApiUrlV1 = 'http://localhost:8080/ods/api/v1';
  odsBaseApiUrlV2 = 'http://localhost:8080/ods/api/v2';
  apiVersion: String = 'v1';
  requestOptions;
  restService: AbstractRestService;

  constructor(private configService: ConfigService,
              private http: HttpClient) {
    this.odsBaseApiUrlV1 = this.configService.getBasicUrl();
    this.apiVersion = this.configService.getVersion();
    this.setHeader();
    this.setRestService();
  }

  setHeader() {
    if (this.apiVersion === 'v1') {
      this.requestOptions = this.setV1HeaderParams();
    } else if (this.apiVersion === 'v2') {
      this.requestOptions = this.setV2HeaderParams();
    } else {
      console.log('HttpHeader not set');
    }
  }

  setRestService() {
    if (this.apiVersion === 'v1') {
      this.restService = new V1RestService(this.http);
    } else if (this.apiVersion === 'v2') {
      this.restService = new V2RestService(this.http);
    } else {
      console.log('Restservice not set');
    }
  }

  setV1HeaderParams() {
    const headerParams = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization' : String('Basic ' + btoa('admin@adminland.com:admin123'))
    };

    const reqOpts = {
      headers: new HttpHeaders(headerParams)
    };
    return reqOpts;
  }

  setV2HeaderParams() {
    const headerParams = {
      'Authorization' : String('Basic ' + btoa('admin@adminland.com:admin123'))
    };

    const reqOpts = {
      headers: new HttpHeaders(headerParams)
    };
    return reqOpts;
  }


  get(url: string): Observable<any> {
    return this.restService.get(url)
      .pipe(catchError(this.handleError));
  }

  getV2(url: string): Observable<any> {
    return this.restService.get(url);
  }


  post(url: string, data: any): Observable<any> {
    return this.restService.post(url, data)
      .pipe(catchError(this.handleError));
  }

  put(url: string, data: any): Observable<any> {
    return this.restService.put(url, data)
      .pipe(catchError(this.handleError));
  }

  delete(url: string) {
    return this.restService.delete(url)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.log('error: ');
    console.log(error);
    return error;
  }
}
