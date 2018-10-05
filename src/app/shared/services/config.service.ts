/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  odsBaseApiUrlV1 = 'http://localhost:8080/ods/api/v1';
  odsBaseApiUrlV2 = 'http://localhost:8080/ods/api/v2';
  rootUrl = 'http://localhost:8080/ods/api/';

constructor() {}

  public getRootUrl(): String {
    return this.rootUrl;
  }

  public getBasicUrl(): string {
    return this.rootUrl + 'v1';
  }

  public setRootUrl(url: string) {
      this.rootUrl = url;
  }
}
