/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { Injectable } from '@angular/core';
import {BasicRestService} from './basic-rest.service';
import {DataSource} from '../model/data-source';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService {

  dataSourceUrl = '/datasources';

  constructor(private service: BasicRestService) {}

  getDataSource(): Observable<DataSource[]> {
    return this.service.get(this.dataSourceUrl);
  }

  getDataSourceById(sourceId: String): Observable<DataSource> {
    return this.service.get(this.dataSourceUrl + '/' + sourceId);
  }

  getDataSourceSchemaById(sourceId: String): Observable<DataSource> {
    return this.service.get(this.dataSourceUrl + '/' + sourceId + '/schema');
  }

  addDataSource(body: DataSource) {
    const sourceId = body.id;
    const data = {
      'domainIdKey' : body.domainIdKey,
      'metaData' : body.metaData,
      'schema': body.schema
    };
    return this.service.put(this.dataSourceUrl + '/' + sourceId, JSON.stringify(data));
  }

  deleteDataSource(sourceId: String) {
    return this.service.delete( this.dataSourceUrl + '/' + sourceId);
  }

}
