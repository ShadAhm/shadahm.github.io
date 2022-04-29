import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { KeyProjectAchievement } from 'src/app/models/resume';
import { ResumeService } from 'src/app/services/resume.service';

@Component({
  selector: 'app-projects-pro',
  templateUrl: './projects-pro.component.html',
  styleUrls: ['./projects-pro.component.scss']
})
export class ProjectsProComponent implements OnInit {
  projects: KeyProjectAchievement[];

  constructor(private resumeService: ResumeService) { }

  ngOnInit() {
    this.getKeyProjectAchievements(); 
  }

  getKeyProjectAchievements(): void {
    this.resumeService.getProProjects().subscribe(
      (response: KeyProjectAchievement[]) => { this.projects = response },
      (error) => { console.error("Error happened", error) }
    );
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
    if(years === 1) yearPortion = yearPortion.replace('years', 'year'); 

    let monthPortion = months > 0 ? ' ' + months + ' months' : '';
    if(months === 1) monthPortion = monthPortion.replace('months', 'month'); 

    return (yearPortion + monthPortion).trim();
  }
}
