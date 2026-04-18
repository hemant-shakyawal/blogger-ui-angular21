import { TestBed } from '@angular/core/testing';

import { Imageselectorservice } from './imageselectorservice';

describe('Imageselectorservice', () => {
  let service: Imageselectorservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Imageselectorservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
