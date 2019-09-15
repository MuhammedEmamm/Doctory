import { TestBed, inject } from '@angular/core/testing';

import { RegisetrationService } from './regisetration.service';

describe('RegisetrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisetrationService]
    });
  });

  it('should be created', inject([RegisetrationService], (service: RegisetrationService) => {
    expect(service).toBeTruthy();
  }));
});
