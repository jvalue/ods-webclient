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
