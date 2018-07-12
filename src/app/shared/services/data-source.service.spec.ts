/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { TestBed, inject } from '@angular/core/testing';

import { DataSourceService } from './data-source.service';

describe('DataSourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataSourceService]
    });
  });

  it('should be created', inject([DataSourceService], (service: DataSourceService) => {
    expect(service).toBeTruthy();
  }));
});
