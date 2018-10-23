/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/

export class ProcessorSpecification {

  name: string;
  // @NotNull private final ProcessorType type;
  type: string;
  // @NotNull private final Map<String, Class<?>> argumentTypes;
  argumentTypes: any;

  constructor () {}
}
