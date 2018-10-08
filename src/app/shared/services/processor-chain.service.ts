/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { Injectable } from '@angular/core';
import {BasicRestService} from './basic-rest.service';
import {Observable} from 'rxjs';
import {ProcessorChain} from '../model/processor-chain';

@Injectable({
  providedIn: 'root'
})
export class ProcessorChainService {

  constructor(private service: BasicRestService) { }

  getAllProcessorChains(sourceId: string): Observable<ProcessorChain[]> {
    return this.service.get('/datasources/' + sourceId + '/filterChains');
  }
  getProcessorChain(sourceId: string, filterChainId: string): Observable<ProcessorChain> {
    return this.service.get('/datasources/' + sourceId + '/filterChains/' + filterChainId);
  }
  addProcessorChain(sourceId: string, filterChainId: string) {
    return this.service.get('/datasources/' + sourceId + '/filterChains/' + filterChainId);
  }
  deleteProcessorChain(sourceId: string, filterChainId: string) {
    return this.service.delete('/datasources/' + sourceId + '/filterChains/' + filterChainId);
  }
}
