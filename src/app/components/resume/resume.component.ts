import { Component, OnInit } from '@angular/core';
import { ResumeContent, EmploymentHistory, KeyProjectAchievement, TechnicalSkill } from 'src/app/models/resume';

import { ResumeService } from 'src/app/services/resume.service';
import * as moment from 'moment';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  contents: ResumeContent[];
  technicalSkills: TechnicalSkill[];
  employmentHistories: EmploymentHistory[];
  keyProjectAchievements: KeyProjectAchievement[];
  constructor(private resumeService: ResumeService) { }

  ngOnInit() {
    this.getResumeContents();
    this.getTechnicalSkills();
    this.getEmploymentHistories();
    this.getKeyProjectAchievements(); 
  }

  scrollIntoView(elementId: string): void {
    let element = document.getElementById(elementId);
    if (element) {
      document.getElementById(elementId).scrollIntoView({ behavior: 'smooth' });
    }
  }

  getResumeContents(): void {
    this.contents = [
      {
        displayText: 'Introduction',
        elementId: 'h2Introduction',
        children: null
      },
      {
        displayText: 'Technical Skills',
        elementId: 'h2Skills',
        children: null
      },
      {
        displayText: 'Employment History',
        elementId: 'h2Employment',
        children: null
      },
      {
        displayText: 'Key Project Achievements',
        elementId: 'h2KeyProject',
        children: [{
          displayText: 'Jobs API / Subcontractor Portal ',
          elementId: 'h3projActivities',
          children: null
        },
        {
          displayText: 'Intelligent Tourism',
          elementId: 'h3projIntelligent',
          children: null
        },
        {
          displayText: 'Submission Tracking and Rating System',
          elementId: 'h3projStar',
          children: null
        },
        {
          displayText: 'Capital Gains Tax Worksheets',
          elementId: 'h3projCgtw',
          children: null
        }]
      },
      {
        displayText: 'Education and Certifications',
        elementId: 'h2Education',
        children: null
      },
      {
        displayText: 'Other Information',
        elementId: 'h2Other',
        children: null
      }];
  }

  getTechnicalSkills(): void {
    this.resumeService.getTechnicalSkills().subscribe(
      (response: TechnicalSkill[]) => { this.technicalSkills = response },
      (error) => { console.error("Error happened", error) }
    );
  }

  getEmploymentHistories(): void {
    this.resumeService.getEmploymentHistories().subscribe(
      (response: EmploymentHistory[]) => { this.employmentHistories = response },
      (error) => { console.error("Error happened", error) }
    );
  }

  getKeyProjectAchievements(): void {
    this.resumeService.getKeyProjectAchievements().subscribe(
      (response: KeyProjectAchievement[]) => { this.keyProjectAchievements = response },
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

  calculateTotalYearsExp(): string {
    if (this.employmentHistories) {
      let fromDateStr = this.employmentHistories[this.employmentHistories.length - 1].fromDate;
      let toDateStr = (new Date()).toISOString();

      return this.calculateTimeDuration(fromDateStr, toDateStr);
    }
  }

  print(): void {
    window.print();
  }
}
