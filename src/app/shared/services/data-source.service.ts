/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {BasicRestService} from './basic-rest.service';
import {DataSource} from '../model/dataSource';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService {

  odsBaseUrl = "http://localhost:8080/ods/api/v1/datasources";

  constructor(private service: BasicRestService) { }

  getDataSource(): Observable<DataSource[]> {
    return this.service.get(this.odsBaseUrl);
  }

  getDataSourceById(sourceId: String): Observable<DataSource> {
    return this.service.get(this.odsBaseUrl+'/' + sourceId);
  }

  getDataSourceSchemaById(sourceId: String): Observable<DataSource> {
    return this.service.get(this.odsBaseUrl +'/' + sourceId + '/schema')
  }

  addDataSource(sourceId: String, body: any): Observable<DataSource> {
    return this.service.put(this.odsBaseUrl+'/' + sourceId, body);
  }
  deleteDataSource(sourceId: String, body: any): Observable<DataSource> {
    return this.service.delete(this.odsBaseUrl +'/' + sourceId, body);
  }
}
