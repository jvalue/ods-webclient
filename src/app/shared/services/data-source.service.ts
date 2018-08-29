/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { Injectable } from '@angular/core';
import {BasicRestService} from './basic-rest.service';
import {DataSource} from '../model/dataSource';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService {

  odsBaseUrl = 'http://localhost:8080/ods/api/v1/datasources';
  private datasources: DataSource[] = [];
  private datasourceById: DataSource;
  private datasourceSchemaById: DataSource;

  constructor(private service: BasicRestService) { }

  getDataSource(): DataSource[] {
    this.service.get(this.odsBaseUrl).subscribe(
       (data: DataSource[]) => {
         for (let i = 0; i < data.length; i++) {
           this.datasources[i] = data[i];
         }
       });
    return this.datasources ;
  }

  getDataSourceById(sourceId: String): DataSource {
    this.service.get(this.odsBaseUrl + '/' + sourceId)
      .subscribe((data: DataSource) => this.datasourceById = data);
    return this.datasourceById;
  }

  getDataSourceSchemaById(sourceId: String): DataSource {
    this.service.get(this.odsBaseUrl + '/' + sourceId + '/schema')
      .subscribe((data: DataSource) => this.datasourceSchemaById = data);
    return this.datasourceSchemaById;
  }

  addDataSource(sourceId: String, body: any) {
    return this.service.put(this.odsBaseUrl + '/' + sourceId, body);
  }

  deleteDataSource(sourceId: String) {
    return this.service.delete(this.odsBaseUrl + '/' + sourceId);
  }
}
