/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { Injectable } from '@angular/core';
import {BasicRestService} from './basic-rest.service';
import {User} from '../model/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private service: BasicRestService) { }

  getAllUsers(): Observable<User[]> {
    return this.service.get('/users');
  }
  getMyself(): Observable<User> {
    return this.service.get('/users/me');
  }
}
