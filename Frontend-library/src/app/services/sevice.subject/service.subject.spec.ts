import { TestBed } from '@angular/core/testing';

import { ServiceSubject } from './service.subject';

describe('ServiceSubject', () => {
  let service: ServiceSubject;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceSubject);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
