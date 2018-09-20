/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourceFormComponent } from './data-source-form.component';

describe('DataSourceFormComponent', () => {
  let component: DataSourceFormComponent;
  let fixture: ComponentFixture<DataSourceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSourceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSourceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
