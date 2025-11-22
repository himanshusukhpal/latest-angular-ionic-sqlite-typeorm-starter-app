import { TestBed } from '@angular/core/testing';

import { DbPostSetService } from './db-post-set.service';

describe('DbPostSetService', () => {
  let service: DbPostSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbPostSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
