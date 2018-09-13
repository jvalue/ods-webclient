import { TestBed, inject } from '@angular/core/testing';

import { DataViewService } from './data-view.service';

describe('DataViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataViewService]
    });
  });

  it('should be created', inject([DataViewService], (service: DataViewService) => {
    expect(service).toBeTruthy();
  }));
});
