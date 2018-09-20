/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataSource} from '../../../shared/model/dataSource';
import {DataSourceService} from '../../../shared/services/data-source.service';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-data-source-form',
  templateUrl: './data-source-form.component.html',
})
export class DataSourceFormComponent implements OnInit {

  formGroup: FormGroup;
  dataSource: DataSource;
  observable: Observable<HttpResponse<any>>;

  constructor(private _formBuilder: FormBuilder,
              private service: DataSourceService) {
  }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
        id: ['', Validators.required],
        domainIdKey: [''],
        schema: this.createSchema(),
        metaData: this.initMetaData()
      }
    );
  }

  initMetaData()  {
    return this._formBuilder.group({
      name: [''],
      title: [''],
      author: [''],
      authorEmail: [''],
      notes: [''],
      url: [''],
      termsOfUse: ['']
    });
  }

  createSchema() {
    return this._formBuilder.group({});
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dataSource = this.formGroup.getRawValue();
    }
    // TODO write function to stringify else schema-property with id as name is filtered out
    const dat = JSON.stringify(this.dataSource,
      ['domainIdKey', 'schema', 'metaData', 'name',
      'title', 'author', 'authorEmail', 'url', 'notes', 'termsOfUse']);
    this.service.addDataSource(this.dataSource.id, dat).subscribe(
      data => console.log(data)
    );
  }
}


