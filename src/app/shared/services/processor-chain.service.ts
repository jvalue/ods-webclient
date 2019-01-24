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
  addProcessorChain(sourceId: string, body: ProcessorChain) {
    const filterChainId = body.id;
    const processedProcessors: any = [];
    // let arg: {[k: string]: any} = {};

    body.processors.forEach((obj: {[k: string]: any}) => {
      // first stringyfy then parse to get object data
      const argsFromObj = JSON.stringify(obj.arguments);
      const parsed = JSON.parse(argsFromObj);
      const args = {};
      for ( const a of parsed) {
        Object.assign(args, a);
      }
      const proc = {
        'name' : obj.name,
        'arguments' : args
      };
      processedProcessors.push(proc);
    });
    const data = {
      'processors' : processedProcessors,
      'executionInterval' : body.executionInterval
    };
    console.log(JSON.stringify(data));



    return this.service.put('/datasources/' + sourceId + '/filterChains/' + filterChainId, JSON.stringify(data));
  }
  deleteProcessorChain(sourceId: string, filterChainId: string) {
    return this.service.delete('/datasources/' + sourceId + '/filterChains/' + filterChainId);
  }

}
