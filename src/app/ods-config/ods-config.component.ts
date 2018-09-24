/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import {Component, OnInit} from '@angular/core';
import {DataSourceService} from '../shared/services/data-source.service';
import {Observable} from 'rxjs';
import {DataSource} from '../shared/model/data-source';

@Component({
  selector: 'app-ods-config',
  templateUrl: './ods-config.component.html',
  providers: [DataSourceService]
})
export class OdsConfigComponent implements OnInit {

  public datasources: Observable<DataSource[]>;

  constructor(private dataSourceService: DataSourceService) {
  }

  ngOnInit() {
    this.datasources = this.dataSourceService.getDataSource();
  }
}
