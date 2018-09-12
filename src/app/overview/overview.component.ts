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

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  public users: Observable<User[]>;
  public datasources: Observable<DataSource[]>;
  public myself: Observable<User>;
  displayedColumns: string[] = ['email', 'name', 'role', 'id'];

  constructor(private userService: UserService,
              private  dataSourceService: DataSourceService) {}

  ngOnInit() {
    this.users = this.userService.getAllUsers();
    this.datasources = this.dataSourceService.getDataSource();
  }
  getMyself() {
    this.myself = this.userService.getMyself();
  }
}
