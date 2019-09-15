import { TestBed, inject } from '@angular/core/testing';

import { HospitalProfileService } from './hospital-profile.service';

describe('HospitalProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HospitalProfileService]
    });
  });

  it('should be created', inject([HospitalProfileService], (service: HospitalProfileService) => {
    expect(service).toBeTruthy();
  }));
});
