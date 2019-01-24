/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { TestBed, inject } from '@angular/core/testing';

import { BasicRestService } from './basic-rest.service';

describe('BasicRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasicRestService]
    });
  });

  it('should be created', inject([BasicRestService], (service: BasicRestService) => {
    expect(service).toBeTruthy();
  }));
});
