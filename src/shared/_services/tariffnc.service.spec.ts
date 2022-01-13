import { TestBed } from '@angular/core/testing';

import { TariffncService } from './tariffnc.service';

describe('TariffncService', () => {
  let service: TariffncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TariffncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
