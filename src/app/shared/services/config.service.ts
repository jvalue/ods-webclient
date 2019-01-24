/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { Injectable } from '@angular/core';
import {BasicRestService} from './basic-rest.service';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private service: BasicRestService) {}

  setEndpointUrl(url: string) {
    this.service.setEndpointUrl(url);
  }

  public getEndpointUrl(): String {
    return this.service.endpointUrl;
  }

  login(useremail: string, password: string) {
    this.service.updateLoginInformation(useremail, password);
  }

  getUseremail() {
    return this.service.getUseremail();
  }

}
