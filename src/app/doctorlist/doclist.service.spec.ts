import { TestBed, inject } from '@angular/core/testing';

import { DoclistService } from './doclist.service';

describe('DoclistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoclistService]
    });
  });

  it('should be created', inject([DoclistService], (service: DoclistService) => {
    expect(service).toBeTruthy();
  }));
});
