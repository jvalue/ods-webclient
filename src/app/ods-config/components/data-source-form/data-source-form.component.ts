/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataSource} from '../../../shared/model/data-source';
import {DataSourceService} from '../../../shared/services/data-source.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-data-source-form',
  templateUrl: './data-source-form.component.html',
})
export class DataSourceFormComponent implements OnInit {

  dataSource: DataSource;
  metaDataForm: FormGroup;
  schemaForm: FormGroup;

  constructor(private router: Router,
              private _formBuilder: FormBuilder,
              private service: DataSourceService
  ) {
  }

  ngOnInit() {
    this.metaDataForm = this.createMetaDataForm();
    this.schemaForm = this.createSchemaForm();
  }

  createMetaDataForm() {
    return this._formBuilder.group({
      id: ['', Validators.required],
      domainIdKey: [''],
      metaData: this._formBuilder.group({
        name: [''],
        title: [''],
        author: [''],
        authorEmail: [''],
        notes: [''],
        url: [''],
        termsOfUse: ['']
      })
    });
  }

  submitMetaData() {
    if (this.metaDataForm.valid) {
      this.dataSource = this.metaDataForm.getRawValue();
    }
  }

  createSchemaForm() {
    return this._formBuilder.group({
      schema: ['']
    });
  }

  submitDataSource() {
    if (this.schemaForm.valid) {
      this.dataSource.schema = this.schemaForm.getRawValue();
    }
    this.service.addDataSource(this.dataSource).subscribe(
      isSuccess => {
        this.router.navigate(['odsConfig/datasources/', this.dataSource.id, 'details']).then(err => {
          console.log(err);
        });
        console.log(isSuccess);
      }
    );

  }
}


