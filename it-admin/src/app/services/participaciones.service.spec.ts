import { TestBed } from '@angular/core/testing';

import { ParticipacionesService } from './participaciones.service';

describe('ParticipacionesService', () => {
  let service: ParticipacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
