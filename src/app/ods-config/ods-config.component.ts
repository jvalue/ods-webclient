/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import {Component, OnInit} from '@angular/core';
import {DataSourceService} from '../shared/services/data-source.service';

@Component({
  selector: 'app-ods-config',
  templateUrl: './ods-config.component.html',
  providers: [DataSourceService]
})
export class OdsConfigComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
