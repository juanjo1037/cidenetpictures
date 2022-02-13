import { TestBed } from '@angular/core/testing';

import { ReserveInterceptorService } from './reserve-interceptor.service';

describe('ReserveInterceptorService', () => {
  let service: ReserveInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReserveInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
