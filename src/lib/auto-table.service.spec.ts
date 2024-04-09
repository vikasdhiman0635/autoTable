import { TestBed } from '@angular/core/testing';

import { AutoTableService } from './auto-table.service';

describe('AutoTableService', () => {
  let service: AutoTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
