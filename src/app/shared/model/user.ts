/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class User {

  email: string;
  id: string;
  name: string;
  role: string;

  constructor() {
  }
}
