import { TestBed } from '@angular/core/testing';

import { ZonebehavService } from './zonebehav.service';

describe('ZonebehavService', () => {
  let service: ZonebehavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZonebehavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
