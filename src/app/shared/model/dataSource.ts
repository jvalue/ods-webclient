/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataSource {

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

  constructor (
    // domainIdKey: string,
    // schema: string[],
    // metaData: {
    //   name: string,
    //   title: string,
    //   author: string,
    //   authorEmail: string,
    //   notes: string,
    //   url: string,
    //   termsOfUse: string,
    ) {
    // this.domainIdKey = domainIdKey;
    // this.schema = schema;
    // this.metaData = metaData;
  }



}