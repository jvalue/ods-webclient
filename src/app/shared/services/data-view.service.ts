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

  // @GET
  // @Path("/{viewId}")
  // public Object getView(
  //   @PathParam("sourceId") String sourceId,
  // @PathParam("viewId") String viewId,
  // @QueryParam("execute") boolean execute,
  // @QueryParam("argument") String argument)
  //
  // @PUT
  // @Path("/{viewId}")
  // public DataView addView(
  //   @RestrictedTo(Role.ADMIN) User user,
  // @PathParam("sourceId") String sourceId,
  // @PathParam("viewId") String viewId,
  // @Valid DataViewDescription viewDescription)
  //
  // @DELETE
  // @Path("/{viewId}")
  // public void deleteView(
  //   @RestrictedTo(Role.ADMIN) User user,
  // @PathParam("sourceId") String sourceId,
  // @PathParam("viewId") String viewId)
}
