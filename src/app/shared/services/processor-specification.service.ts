/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ProcessorSpecification} from '../model/processor-specification';
import {BasicRestService} from './basic-rest.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessorSpecificationService {

  constructor(private service: BasicRestService) { }

  getAllProcessorSpecifications(): Observable<ProcessorSpecification[]> {
    return this.service.get('/filterTypes');
  }
}
