import { TestBed } from '@angular/core/testing';

import { SaveQrDataService } from './save-qr-data.service';

describe('SaveQrDataService', () => {
  let service: SaveQrDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveQrDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
