/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { Component, OnInit } from '@angular/core';
import {User} from '../shared/model/user';
import {UserService} from '../shared/services/user.service';
import {Observable} from 'rxjs';
import {DataSourceService} from '../shared/services/data-source.service';
import {DataSource} from '../shared/model/dataSource';
import {Version} from '../shared/model/version';
import {ProcessorSpecification} from '../shared/model/processorSpecification';
import {DataViewService} from '../shared/services/data-view.service';
import {DataView} from '../shared/model/dataView';
import {ProcessorSpecificationService} from '../shared/services/processor-specification.service';
import {VersionService} from '../shared/services/version.service';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  public users: Observable<User[]>;
  public datasources: Observable<DataSource[]>;
  public version: Observable<Version>;
  public processorSpecifications: Observable<ProcessorSpecification[]>;
  public views: Observable<DataView[]>;

  constructor(private userService: UserService,
              private dataSourceService: DataSourceService,
              private versionService: VersionService,
              private processorService: ProcessorSpecificationService,
              private dataViewService: DataViewService,
  ) {}

  ngOnInit() {
    this.users = this.userService.getAllUsers();
    this.datasources = this.dataSourceService.getDataSource();
    this.version = this.versionService.getVersion();
    this.processorSpecifications = this.processorService.getAllProcessorSpecifications();
    this.views = this.dataViewService.getAllViews('pegelonline');
  }

}
