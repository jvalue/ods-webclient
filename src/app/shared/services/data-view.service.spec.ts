/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { TestBed, inject } from '@angular/core/testing';

import { DataViewService } from './data-view.service';

describe('DataViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataViewService]
    });
  });

  it('should be created', inject([DataViewService], (service: DataViewService) => {
    expect(service).toBeTruthy();
  }));
});
