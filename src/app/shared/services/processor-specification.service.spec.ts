import { TestBed, inject } from '@angular/core/testing';

import { ProcessorSpecificationService } from './processor-specification.service';

describe('ProcessorSpecificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessorSpecificationService]
    });
  });

  it('should be created', inject([ProcessorSpecificationService], (service: ProcessorSpecificationService) => {
    expect(service).toBeTruthy();
  }));
});
