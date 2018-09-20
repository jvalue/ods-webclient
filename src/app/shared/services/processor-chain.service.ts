/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { Injectable } from '@angular/core';
import {BasicRestService} from './basic-rest.service';
import {Observable} from 'rxjs';
import {ProcessorChain} from '../model/processorChain';

@Injectable({
  providedIn: 'root'
})
export class ProcessorChainService {
  odsBaseUrl = 'http://localhost:8080/ods/api/v1';

  constructor(private service: BasicRestService) { }

  getAllProcessorChains(sourceId: string): Observable<ProcessorChain[]> {
    return this.service.get(this.odsBaseUrl + '/' + sourceId + '/filterChains');
  }
  getProcessorChain(sourceId: string, filterChainId: string): Observable<ProcessorChain> {
    return this.service.get(this.odsBaseUrl + '/' + sourceId + '/' + filterChainId);
  }
  addProcessorChain(sourceId: string, filterChainId: string) {
    return this.service.get(this.odsBaseUrl + '/' + sourceId + '/' + filterChainId);
  }
  deleteProcessorChain(sourceId: string, filterChainId: string) {
    return this.service.get(this.odsBaseUrl + '/' + sourceId + '/' + filterChainId);
  }
}
