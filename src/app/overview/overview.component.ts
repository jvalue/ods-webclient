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
import {SettingsService} from '../shared/services/settings.service';
import {Version} from '../shared/model/version';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  public users: Observable<User[]>;
  public datasources: Observable<DataSource[]>;
  public myself: Observable<User>;
  public version: Observable<Version>;
  displayedColumns: string[] = ['email', 'name', 'role', 'id'];

  constructor(private userService: UserService,
              private  dataSourceService: DataSourceService,
              private  settingsService: SettingsService) {}

  ngOnInit() {
    this.users = this.userService.getAllUsers();
    this.datasources = this.dataSourceService.getDataSource();
    this.version = this.settingsService.getVersion();
  }
  getMyself() {
    this.myself = this.userService.getMyself();
  }

}
