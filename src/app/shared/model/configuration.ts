/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import {Injectable} from '@angular/core';
import {ProcessorChain} from './processorChain';
import {DataSource} from './dataSource';

@Injectable({
  providedIn: 'root',
})
export class Configuration {
  dataSource: DataSource;
  processorChains: ProcessorChain[];
  views: DataView[];
  constructor () {}
}
