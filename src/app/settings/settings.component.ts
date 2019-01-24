/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { Component, OnInit } from '@angular/core';
import {DataSourceService} from '../shared/services/data-source.service';
import {ConfigService} from '../shared/services/config.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  providers: [ SettingsComponent, DataSourceService ]
})
export class SettingsComponent implements OnInit {

  configForm: FormGroup;
  userLoginForm: FormGroup;

  constructor(private service: ConfigService,
              private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.configForm = this.createConfigForm();
    this.userLoginForm = this.createUserLoginForm();
  }

  createConfigForm() {
    return this._formBuilder.group({
      rootUrl: [this.service.getEndpointUrl()]
    });
  }

  createUserLoginForm() {
    return this._formBuilder.group({
      useremail: [ this.service.getUseremail(), [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  setEndpointUrl(url: string) {
    this.service.setEndpointUrl(url);
  }

  save(form: FormGroup) {
    this.setEndpointUrl(form.getRawValue());
  }

  saveLogin() {
    const data = this.userLoginForm.getRawValue();
    console.log(data);
    this.service.login( data.useremail, data.password);
  }
}
