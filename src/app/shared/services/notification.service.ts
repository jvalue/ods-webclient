/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { Injectable } from '@angular/core';
import {BasicRestService} from './basic-rest.service';
import {Observable} from 'rxjs';
import {NotificationClient} from '../model/notification-client';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private service: BasicRestService) { }

  getAllClients(sourceId: string): Observable<NotificationClient[]> {
    return this.service.get('/datasources/' + sourceId + '/notifications');
  }

  addNewClient(sourceId: string, body: NotificationClient) {
    const clientId = body.id;
    const data = {
      'type': body.type,
    };
    Object.assign(data, body.typeArguments);
    return this.service.put('/datasources/' + sourceId + '/notifications/' + clientId, JSON.stringify(data));
  }

  deleteClient(sourceId: string, clientId: string) {
    return this.service.delete('/datasources/' + sourceId + '/notifications/' + clientId);
  }
}
