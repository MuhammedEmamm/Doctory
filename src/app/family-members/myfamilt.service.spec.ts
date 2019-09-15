import { TestBed, inject } from '@angular/core/testing';

import { MyfamiltService } from './myfamilt.service';

describe('MyfamiltService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyfamiltService]
    });
  });

  it('should be created', inject([MyfamiltService], (service: MyfamiltService) => {
    expect(service).toBeTruthy();
  }));
});
