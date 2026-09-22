import { TestBed } from '@angular/core/testing';

import { DurationService } from './duration.service';

describe('DurationService', () => {
  let service: DurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate whole years between two dates', () => {
    const years = service.calculateWholeYears('2013-04-01T00:00:00.000Z', '2026-04-01T00:00:00.000Z');
    expect(years).toBe(13);
  });

  it('should calculate whole years relative to current date when toDateStr is null', () => {
    const now = new Date();
    const tenYearsAgo = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate()).toISOString();
    expect(service.calculateWholeYears(tenYearsAgo, null)).toBe(10);
  });
});
