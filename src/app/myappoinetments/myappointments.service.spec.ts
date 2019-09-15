import { TestBed, inject } from '@angular/core/testing';

import { MyappointmentsService } from './myappointments.service';

describe('MyappointmentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyappointmentsService]
    });
  });

  it('should be created', inject([MyappointmentsService], (service: MyappointmentsService) => {
    expect(service).toBeTruthy();
  }));
});
