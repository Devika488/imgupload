import { TestBed } from '@angular/core/testing';

import { File.ServicesService } from './file.services.service';

describe('File.ServicesService', () => {
  let service: File.ServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(File.ServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
