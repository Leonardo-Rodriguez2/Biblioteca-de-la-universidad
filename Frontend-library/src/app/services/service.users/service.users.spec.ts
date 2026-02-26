import { TestBed } from '@angular/core/testing';

import { ServiceUsers } from './service.users';

describe('ServiceUsers', () => {
  let service: ServiceUsers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceUsers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
