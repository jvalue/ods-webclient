/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import {DataSourceService} from '../services/data-source.service';
import {Injectable} from '@angular/core';
import {SettingsService} from '../services/settings.service';


@Injectable({
  providedIn: 'root',
})
export class DataSource {

  headers: string[];
  bodyObject: any[];
  public JSON = JSON;
  public resp: any[];

  constructor(private dataService: DataSourceService,
              private settingsSevice: SettingsService) {}

  public getText(){
    console.log(this.dataService.odsBaseUrl);
    console.log("Basic" + btoa(
      this.settingsSevice.getUsername() +":"+ this.settingsSevice.getPassword()));
  }


  public createBodyForDataSource(): Object {
    let body = {
      domainIdKey: "/id",
      schema: {},
      metaData: {
        name: "TestData",
        title: "TestData",
        author: "",
        authorEmail: "",
        notes: "",
        url: "",
        termsOfUse: ""
      }
    };
  return body;
 }

  public async getDataSource() {
    try {
      const data = await this.dataService.getDataSource().toPromise();
      const keys = data.headers.keys();
      this.headers = keys.map(key => `${key}: ${data.headers.get(key)}`);
      this.bodyObject = Object.values({...data.body});
    } catch (e) {
      console.error(e);
    }

  }

  public async getDataSourceById(sourceId: String) {
    try{
    const data = await this.dataService.getDataSourceById(sourceId).toPromise();
      const keys = data.headers.keys();
      this.headers = keys.map(key => `${key}: ${data.headers.get(key)}`);
      this.bodyObject = Object.values({...data.body});
    }catch(e) {
      console.log("error occured")
      console.error(e);
    }
  }

  public async getDataSourceSchemaById(sourceId: String){
    try {
      const data = await this.dataService.getDataSourceSchemaById(sourceId).toPromise();
      const keys = data.headers.keys();
      this.headers = keys.map(key => `${key}: ${data.headers.get(key)}`);
      this.bodyObject = Object.values({...data.body});
    } catch (e) {
      console.error(e);
    }
  }

  public async addDataSource(sourceId: String) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append("Authorization", "Basic " + btoa(
        this.settingsSevice.getUsername() + ":" + this.settingsSevice.getPassword()));

    await this.dataService.addDataSource(sourceId, this.createBodyForDataSource(), {headers: headers}).toPromise()
      .catch(error => console.error(error));
  }

  public async deleteDataSource(sourceId: String) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append("Authorization", "Basic " + btoa(this.settingsSevice.getUsername() +
      ":" + this.settingsSevice.getPassword()));

    await this.dataService.deleteDataSource(sourceId, {headers: headers}).toPromise()
      .catch(error => console.error(error));

  }
}
