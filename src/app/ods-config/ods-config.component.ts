/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import {Component, OnInit} from '@angular/core';
import {DataSourceService} from '../shared/services/data-source.service';
import {DataSource} from '../shared/module/DataSource';

@Component({
  selector: 'app-ods-config',
  templateUrl: './ods-config.component.html',
  providers: [DataSourceService, DataSource]
})
export class OdsConfigComponent implements OnInit {
  bodyObject: Object;
  public name: Object;
  public sourceId: String;


  constructor(public dataSource: DataSource) {}

  ngOnInit() {
  }

  getText() {
    this.dataSource.getText();
  }

  getSourceId(): String {
    return this.sourceId;
  }

  setSourceId(sourceId: String) {
    this.sourceId = sourceId;
  }

  getDataSource(){
    console.log("getDatasource");
    this.dataSource.getDataSource();
    this.bodyObject = this.dataSource.bodyObject;
  }

  getDataSourceById(sourceId: String){
    this.dataSource.getDataSourceById(sourceId);
    this.bodyObject = this.dataSource.bodyObject;

  }

  addDataSourceFromClass(sourceId: String) {
    this.dataSource.addDataSource(sourceId);
    this.bodyObject = this.dataSource.bodyObject;
  }

  deleteDataSource(sourceId: String){
    this.dataSource.deleteDataSource(sourceId);
    this.bodyObject = this.dataSource.bodyObject;
  }

}
