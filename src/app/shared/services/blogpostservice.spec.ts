import { TestBed } from '@angular/core/testing';

import { Blogpostservice } from './blogpostservice';

describe('Blogpostservice', () => {
  let service: Blogpostservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Blogpostservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
