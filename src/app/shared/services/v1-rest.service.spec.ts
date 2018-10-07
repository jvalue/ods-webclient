import { TestBed, inject } from '@angular/core/testing';

import { V1RestService } from './v1-rest.service';

describe('V1RestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [V1RestService]
    });
  });

  it('should be created', inject([V1RestService], (service: V1RestService) => {
    expect(service).toBeTruthy();
  }));
});
