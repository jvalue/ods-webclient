/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProcessorSpecification {

  name: string;
  // @NotNull private final ProcessorType type;
  type: any;
  // @NotNull private final Map<String, Class<?>> argumentTypes;
  argumenTypes: any;

  constructor () {}
}
