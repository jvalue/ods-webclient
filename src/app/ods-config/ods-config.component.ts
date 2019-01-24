/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import {Component, OnInit} from '@angular/core';
import {DataSourceService} from '../shared/services/data-source.service';
import {DataSource} from '../shared/model/data-source';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-ods-config',
  templateUrl: './ods-config.component.html',
  providers: [DataSourceService]
})
export class OdsConfigComponent implements OnInit {

  public dataSourceDataSource: MatTableDataSource<DataSource>;


  constructor(private dataSourceService: DataSourceService) {
  }

  ngOnInit() {
    this.dataSourceService.getDataSource().subscribe(value => {
      this.dataSourceDataSource = new MatTableDataSource(value);
    });
  }

  deleteDatasource(sourceId: string) {
    this.dataSourceService.deleteDataSource(sourceId).subscribe();
  }
}
