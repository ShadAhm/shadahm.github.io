import { TestBed } from '@angular/core/testing';

import { DurationService } from './duration.service';

describe('DurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DurationService = TestBed.get(DurationService);
    expect(service).toBeTruthy();
  });
});
