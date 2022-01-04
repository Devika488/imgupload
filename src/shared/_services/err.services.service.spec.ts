import { TestBed } from '@angular/core/testing';

import { ErrServicesService } from './errservices.service';

describe('Err.ServicesService', () => {
  let service: ErrServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
