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
