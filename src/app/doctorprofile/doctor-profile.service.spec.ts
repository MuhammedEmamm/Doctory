import { TestBed, inject } from '@angular/core/testing';

import { DoctorProfileService } from './doctor-profile.service';

describe('DoctorProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoctorProfileService]
    });
  });

  it('should be created', inject([DoctorProfileService], (service: DoctorProfileService) => {
    expect(service).toBeTruthy();
  }));
});
