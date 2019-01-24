/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/

export class DataSource {

  id: string;
  domainIdKey: String;
  schema: String[];
  metaData: {
    name: String,
    title: String,
    author: String,
    authorEmail: String,
    notes: String,
    url: String,
    termsOfUse: String,
  };

  constructor () {}
}
