/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class User {

  private userName: string;
  private password: string;

  constructor(userName: string, password: string) {
    this.userName = userName;
    this.password = password;
  }

  getUserName() {
    return this.userName;
  }

  setPassword(newPassword: string) {
    this.password = newPassword;
  }

  getBasicUserAuthentification(): string {
    return "Basic " + btoa(this.userName + ":" + this.password);
  }

}
