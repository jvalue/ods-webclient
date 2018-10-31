/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/

export class ProcessorChain {
  id: string;
  processors: {
    name: string,
    argument: any
  }[];
  executionInterval: any;
  constructor () {}
}
