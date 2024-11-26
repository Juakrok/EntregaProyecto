import { TestBed } from '@angular/core/testing';

import { ParticipaService } from './participa.service';

describe('ParticipaService', () => {
  let service: ParticipaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
