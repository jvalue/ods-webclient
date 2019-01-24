/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Version} from '../model/version';
import {BasicRestService} from './basic-rest.service';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(private service: BasicRestService) { }

  public getVersion(): Observable<Version> {
    return this.service.get('/version');
  }

}
