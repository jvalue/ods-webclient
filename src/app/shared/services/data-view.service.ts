/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { Injectable } from '@angular/core';
import {BasicRestService} from './basic-rest.service';
import {Observable} from 'rxjs';
import {DataView} from '../model/data-view';

@Injectable({
  providedIn: 'root'
})
export class DataViewService {

  odsBaseUrl = 'http://localhost:8080/ods/api/v1';

  constructor(private service: BasicRestService) { }

  getAllViews(sourceId: string): Observable<DataView[]> {
    return this.service.get(this.odsBaseUrl + '/datasources/' + sourceId + '/views');
  }
  getView(sourceId: string, viewId: string) {
    return this.service.get(this.odsBaseUrl + '/datasources/' + sourceId + '/views/' + viewId);
  }

  addView(sourceId: string, viewId: string, view: DataView) {
    return this.service.put(this.odsBaseUrl + '/datasources/' + sourceId + '/views/' + viewId, view);
  }

  deleteView(sourceId: string, viewId: string) {
    return this.service.delete(this.odsBaseUrl + '/datasources/' + sourceId + '/views/' + viewId);
  }
}
