/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/

import {KeyValue} from '@angular/common';

export class ProcessorChain {
  id: string;
  processors: {
    name: string,
    argument: KeyValue<string, object>
  }[];
  executionInterval: any;
  constructor () {}
}
