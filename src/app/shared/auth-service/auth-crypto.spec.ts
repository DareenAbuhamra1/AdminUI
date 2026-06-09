import { TestBed } from '@angular/core/testing';

import { AuthCrypto } from './auth-crypto';

describe('AuthCrypto', () => {
  let service: AuthCrypto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthCrypto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
