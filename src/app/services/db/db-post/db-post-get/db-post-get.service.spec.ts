import { TestBed } from '@angular/core/testing';

import { DbPostGetService } from './db-post-get.service';

describe('DbPostGetService', () => {
  let service: DbPostGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbPostGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
