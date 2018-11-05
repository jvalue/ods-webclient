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


  constructor(private service: BasicRestService) { }

  getAllViews(sourceId: string): Observable<DataView[]> {
    return this.service.get('/datasources/' + sourceId + '/views');
  }
  getView(sourceId: string, viewId: string) {
    return this.service.get('/datasources/' + sourceId + '/views/' + viewId);
  }

  addView(sourceId: string, body: DataView) {
    const viewId = body.id;
    const data = {
      'mapFunction' : body.mapFunction,
    };
    return this.service.put('/datasources/' + sourceId + '/views/' + viewId, JSON.stringify(data));
  }

  deleteView(sourceId: string, viewId: string) {
    return this.service.delete('/datasources/' + sourceId + '/views/' + viewId);
  }
}
