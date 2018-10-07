/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { Injectable } from '@angular/core';

enum ApiVersion {
  V1,
  V2
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  odsBaseApiUrlV1 = 'http://localhost:8080/ods/api/v1';
  odsBaseApiUrlV2 = 'http://localhost:8080/ods/api/v2';
  rootUrl = 'http://localhost:8080/ods/api/';
  apiVersionString: String = 'v1';

  constructor() {}

  getVersion(): String {
    return this.apiVersionString;
  }

  setVersion(apiVersion: ApiVersion) {
    if (apiVersion === ApiVersion.V1) {
      this.apiVersionString = 'v1';
    } else if (apiVersion === ApiVersion.V2) {
      this.apiVersionString = 'v2';
    } else {
      console.log('Error: apiVersion not supported');
    }
  }

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
