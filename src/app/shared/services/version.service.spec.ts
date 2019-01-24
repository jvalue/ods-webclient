/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { TestBed, inject } from '@angular/core/testing';

import { VersionService } from './version.service';

describe('VersionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VersionService]
    });
  });

  it('should be created', inject([VersionService], (service: VersionService) => {
    expect(service).toBeTruthy();
  }));
});
