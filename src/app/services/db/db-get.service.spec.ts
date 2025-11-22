import { TestBed } from '@angular/core/testing';

import { DbGetService } from './db-get.service';

describe('DbGetService', () => {
  let service: DbGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
