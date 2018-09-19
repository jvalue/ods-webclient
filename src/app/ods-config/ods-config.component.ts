/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import {Component, OnInit} from '@angular/core';
import {DataSourceService} from '../shared/services/data-source.service';
import {DataSource} from '../shared/model/dataSource';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-ods-config',
  templateUrl: './ods-config.component.html',
  providers: [DataSourceService]
})
export class OdsConfigComponent implements OnInit {

  public datasources: Observable<DataSource[]>;
  isLinear = false;
  secondFormGroup: FormGroup;

  constructor(private  service: DataSourceService,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.datasources = this.service.getDataSource();
  }
}
