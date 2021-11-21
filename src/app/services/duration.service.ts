import { Injectable } from '@angular/core';
import { IHasDuration } from '../models/resume';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DurationService {

  constructor() { }

  public calculateTotalDuration(durationTimes: IHasDuration[]): number {
    var seconds = 0;

    for (const duration of durationTimes) {
      let fromDate = moment(duration.fromDate);
      let toDate = moment(duration.toDate == null ? (new Date()).toISOString() : duration.toDate);

      seconds += toDate.diff(fromDate, 'seconds');
    }

    return seconds / 31536000;
  }

  calculateTimeDuration(fromDateStr: string, toDateStr: string): string {
    let fromDate = moment(fromDateStr);
    let toDate = moment((new Date()).toISOString());

    if (toDateStr != null && toDateStr != '') {
      toDate = moment(toDateStr);
    }

    let years = toDate.diff(fromDate, 'year');
    fromDate.add(years, 'years');

    let months = toDate.diff(fromDate, 'months');
    fromDate.add(months, 'months');

    let yearPortion = years > 0 ? years + ' years' : '';
    if (years === 1) yearPortion = yearPortion.replace('years', 'year');

    let monthPortion = months > 0 ? ' ' + months + ' months' : '';
    if (months === 1) monthPortion = monthPortion.replace('months', 'month');

    return (yearPortion + monthPortion).trim();
  }
}
