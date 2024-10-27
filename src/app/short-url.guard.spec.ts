import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { shortUrlGuard } from './short-url.guard';

describe('shortUrlGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => shortUrlGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
