import { Injectable } from '@angular/core';
import {BasicRestService} from './basic-rest.service';
import {Observable} from 'rxjs';
import {Version} from '../model/version';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  odsBaseUrl = 'http://localhost:8080/ods/api/v1/datasources';
  versionUrl =  'http://localhost:8080/ods/api/v1';
  public odsBaseName = 'admin@adminland.com'; // 'admin'
  public odsBasePassword = 'admin123';

constructor(private service: BasicRestService) {}

  public getBaseUrl(): String {
    return this.odsBaseUrl;
  }

  public setBaseUrl(url: string) {
    this.odsBaseUrl = url;
  }

  public getUsername(): String {
    return this.odsBaseName;
  }

  public getPassword(): String {
    return this.odsBasePassword;
  }

  public getVersion(): Observable<Version> {
    return this.service.get(this.versionUrl + '/version');
  }
}
