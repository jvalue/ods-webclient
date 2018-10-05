/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { Component, OnInit } from '@angular/core';
import {DataSourceService} from '../shared/services/data-source.service';
import {ConfigService} from '../shared/services/config.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  providers: [ SettingsComponent, DataSourceService ]
})
export class SettingsComponent implements OnInit {

  configForm: FormGroup;

  constructor(private service: ConfigService,
              private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.configForm = this.createConfigForm();
  }

  createConfigForm() {
    return this._formBuilder.group({
      rootUrl: [this.service.getRootUrl()]
    });
  }

  setRootUrl(url: string) {
    this.service.setRootUrl(url);
  }

  save(form: FormGroup) {
    console.log(form.getRawValue());
    this.setRootUrl(form.getRawValue());
  }
}
