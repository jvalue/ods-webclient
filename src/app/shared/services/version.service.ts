import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Version} from '../model/version';
import {BasicRestService} from './basic-rest.service';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(private service: BasicRestService) { }

  public getVersion(): Observable<Version> {
    return this.service.get(this.service.odsBaseApiUrlV1 + '/version');
  }
}
