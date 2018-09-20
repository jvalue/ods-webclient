/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { Injectable } from '@angular/core';
import {BasicRestService} from './basic-rest.service';
import {DataSource} from '../model/dataSource';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService {

  dataSourceUrl = '/datasources';

  constructor(private service: BasicRestService) {}

  getDataSource(): Observable<DataSource[]> {
    return this.service.get(this.service.odsBaseApiUrlV1 + this.dataSourceUrl);
  }

  // getDataSourceV2(): Observable<DataSource[]> {
  //   console.log(this.service.get(this.service.odsBaseApiUrlV2 + this.dataSourceUrl)
  //     .subscribe((data: Response) => console.log(data.json())));
  //   return null;
  // }

  getDataSourceById(sourceId: String): Observable<DataSource> {
    return this.service.get(this.service.odsBaseApiUrlV1 + '/' + sourceId);
  }

  getDataSourceSchemaById(sourceId: String): Observable<DataSource> {
    return this.service.get(this.service.odsBaseApiUrlV1 + '/' + sourceId + '/schema');
  }

  addDataSource(body: DataSource) {
    const sourceId = body.id;
    // TODO write function to stringify else schema-property with id as name is filtered out
    const data = JSON.stringify(body,
      ['domainIdKey', 'schema', 'metaData', 'name',
        'title', 'author', 'authorEmail', 'url', 'notes', 'termsOfUse']);
    return this.service.put(this.service.odsBaseApiUrlV1 + this.dataSourceUrl + '/' + sourceId, data);
  }

  deleteDataSource(sourceId: String) {
    return this.service.delete(this.service.odsBaseApiUrlV1 + this.dataSourceUrl + '/' + sourceId);
  }
}
