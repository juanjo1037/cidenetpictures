import { TestBed } from '@angular/core/testing';

import { MovieInterceptorService } from './movie-interceptor.service';

describe('MovieInterceptorService', () => {
  let service: MovieInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
