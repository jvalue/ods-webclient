/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { TestBed, inject } from '@angular/core/testing';

import { PluginService } from './plugin.service';

describe('PluginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PluginService]
    });
  });

  it('should be created', inject([PluginService], (service: PluginService) => {
    expect(service).toBeTruthy();
  }));
});
