import { TestBed } from '@angular/core/testing';

import { ShortnerService } from './shortner.service';

describe('SearchBarService', () => {
  let service: ShortnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
