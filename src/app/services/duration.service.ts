import { Injectable } from '@angular/core';
import { IHasDuration } from '../models/resume';
import { parseISO, differenceInSeconds, differenceInYears, differenceInMonths, addYears } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class DurationService {

  public calculateTotalDuration(durationTimes: IHasDuration[]): number {
    let seconds = 0;

    for (const duration of durationTimes) {
      const fromDate = parseISO(duration.fromDate);
      const toDate = parseISO(duration.toDate == null ? (new Date()).toISOString() : duration.toDate);

      seconds += differenceInSeconds(toDate, fromDate);
    }

    return seconds / 31536000;
  }

  calculateWholeYears(fromDateStr: string, toDateStr: string): number {
    const fromDate = parseISO(fromDateStr);
    const toDate = (toDateStr != null && toDateStr != '') ? parseISO(toDateStr) : new Date();

    return differenceInYears(toDate, fromDate);
  }

  calculateTimeDuration(fromDateStr: string, toDateStr: string): string {
    const fromDate = parseISO(fromDateStr);
    const toDate = (toDateStr != null && toDateStr != '') ? parseISO(toDateStr) : new Date();

    const years = differenceInYears(toDate, fromDate);
    const afterYears = addYears(fromDate, years);

    const months = differenceInMonths(toDate, afterYears);

    let yearPortion = years > 0 ? years + ' years' : '';
    if (years === 1) yearPortion = yearPortion.replace('years', 'year');

    let monthPortion = months > 0 ? ' ' + months + ' months' : '';
    if (months === 1) monthPortion = monthPortion.replace('months', 'month');

    return (yearPortion + monthPortion).trim();
  }
}
