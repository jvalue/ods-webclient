/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService {

  odsBaseUrl = "http://localhost:8080/ods/api/v1/datasources";

  constructor(private http: HttpClient) { }

  getDataSource(): Observable<HttpResponse<Object>> {
    return this.http.get(this.odsBaseUrl, {observe: 'response'});
  }

  getDataSourceById(sourceId: String): Observable<HttpResponse<Object>> {
    return this.http.get(this.odsBaseUrl+'/' + sourceId, {observe: 'response'});
  }

  getDataSourceSchemaById(sourceId: String): Observable<HttpResponse<Object>> {
    return this.http.get(this.odsBaseUrl +'/' + sourceId + '/schema', {observe: 'response'})
  }

  addDataSource(sourceId: String, body: any, options: any): Observable<any> {
    return this.http.put(this.odsBaseUrl+'/' + sourceId, body, options);
  }
  deleteDataSource(sourceId: String, options: any): Observable<any> {
    return this.http.delete(this.odsBaseUrl +'/' + sourceId, options);
  }
}
