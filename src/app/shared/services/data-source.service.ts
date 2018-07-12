/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataSource} from '../module/DataSource';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(private http: HttpClient) { }

  getDataSource() {
    return this.http.get<DataSource>('');
  }
}
