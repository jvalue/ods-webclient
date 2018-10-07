import { TestBed, inject } from '@angular/core/testing';

import { V2RestService } from './v2-rest.service';

describe('V2RestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [V2RestService]
    });
  });

  it('should be created', inject([V2RestService], (service: V2RestService) => {
    expect(service).toBeTruthy();
  }));
});
