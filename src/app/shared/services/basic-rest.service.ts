/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { Injectable } from '@angular/core';
import {HttpClient} from '../../../../node_modules/@angular/common/http';
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

  basicUrl: string;
  apiVersion: String = 'v1';
  restService: AbstractRestService;

  constructor(private configService: ConfigService,
              private http: HttpClient) {
    this.basicUrl = this.configService.getBasicUrl();
    this.apiVersion = this.configService.getVersion();
    this.setRestService();
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

  get(url: string): Observable<any> {
    return this.restService.get(this.basicUrl + url)
      .pipe(catchError(this.handleError));
  }

  post(url: string, data: any): Observable<any> {
    return this.restService.post(this.basicUrl + url, data)
      .pipe(catchError(this.handleError));
  }

  put(url: string, data: any): Observable<any> {
    return this.restService.put(this.basicUrl + url, data)
      .pipe(catchError(this.handleError));
  }

  delete(url: string) {
    return this.restService.delete(this.basicUrl + url)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.log('error: ');
    console.log(error);
    return error;
  }
}
