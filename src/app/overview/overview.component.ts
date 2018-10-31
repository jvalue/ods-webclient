/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import {Component, OnInit} from '@angular/core';
import {User} from '../shared/model/user';
import {UserService} from '../shared/services/user.service';
import {Observable} from 'rxjs';
import {DataSourceService} from '../shared/services/data-source.service';
import {DataSource} from '../shared/model/data-source';
import {Version} from '../shared/model/version';
import {ProcessorSpecification} from '../shared/model/processor-specification';
import {ProcessorSpecificationService} from '../shared/services/processor-specification.service';
import {VersionService} from '../shared/services/version.service';
import {MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  public version: Observable<Version>;

  public usersDataSource: MatTableDataSource<User>;
  public dataSourcesDataSource: MatTableDataSource<DataSource>;
  public processorSpecificationsDataSource: MatTableDataSource<ProcessorSpecification>;

  constructor(private userService: UserService,
              private dataSourceService: DataSourceService,
              private versionService: VersionService,
              private processorService: ProcessorSpecificationService,
  ) {
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(value => {
      this.usersDataSource = new MatTableDataSource(value);
    });

    this.dataSourceService.getDataSource().subscribe(value => {
      this.dataSourcesDataSource = new MatTableDataSource(value);
    });

    this.processorService.getAllProcessorSpecifications().subscribe(value => {
      this.processorSpecificationsDataSource = new MatTableDataSource(value);
    });

    this.version = this.versionService.getVersion();
  }

  public getKeys(obj) {
    return Object.keys(obj);
  }

}
