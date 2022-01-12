import { TestBed } from '@angular/core/testing';

import { InputdupService } from './inputdup.service';

describe('InputdupService', () => {
  let service: InputdupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputdupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
