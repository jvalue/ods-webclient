/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { TestBed, inject } from '@angular/core/testing';

import { ProcessorChainService } from './processor-chain.service';

describe('ProcessorChainService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessorChainService]
    });
  });

  it('should be created', inject([ProcessorChainService], (service: ProcessorChainService) => {
    expect(service).toBeTruthy();
  }));
});
