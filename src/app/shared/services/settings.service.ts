import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  odsBaseUrl = 'http://localhost:8080/ods/api/v1/datasources';
  versionUrl =  'http://localhost:8080/ods/api/v1';
  public odsBaseName = 'admin@adminland.com'; // 'admin'
  public odsBasePassword = 'admin123';

constructor() {}

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

}
