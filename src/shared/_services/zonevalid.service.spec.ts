import { TestBed } from '@angular/core/testing';

import { ZonevalidService } from './zonevalid.service';

describe('ZonevalidService', () => {
  let service: ZonevalidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZonevalidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
