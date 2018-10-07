import { TestBed, inject } from '@angular/core/testing';

import { AbstractRestService } from './abstract-rest.service';

describe('AbstractRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbstractRestService]
    });
  });

  it('should be created', inject([AbstractRestService], (service: AbstractRestService) => {
    expect(service).toBeTruthy();
  }));
});
