import { Component, OnInit } from '@angular/core';
import { ResumeContent, TechnicalSkillCategory, EmploymentHistory } from 'src/app/models/resume';

import { ResumeService } from 'src/app/services/resume.service';
import * as moment from 'moment';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  contents: ResumeContent[];
  technicalSkillCategories: TechnicalSkillCategory[];
  employmentHistories: EmploymentHistory[];

  constructor(private resumeService: ResumeService) { }

  ngOnInit() {
    this.getResumeContents();
    this.getTechnicalSkills();
    this.getEmploymentHistories();
  }

  scrollIntoView(elementId: string): void {
    document.getElementById(elementId).scrollIntoView({ behavior: 'smooth' });
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
        elementId: 'h2Employment',
        children: [{
          displayText: 'Activities Management / Subcontractor Portal ',
          elementId: 'h3projActivities',
          children: null
        },
        {
          displayText: 'Intelligent Tourism',
          elementId: 'h3projIntelligent',
          children: null
        }
        ]
      },
      {
        displayText: 'Education and Certifications',
        elementId: 'h2Education',
        children: null
      }];
  }

  getTechnicalSkills(): void {
    this.resumeService.getTechnicalSkills().subscribe(
      (response: TechnicalSkillCategory[]) => { this.technicalSkillCategories = response },
      (error) => { console.error("Error happened", error) }
    );;
  }

  getEmploymentHistories(): void {
    this.resumeService.getEmploymentHistories().subscribe(
      (response: EmploymentHistory[]) => { this.employmentHistories = response },
      (error) => { console.error("Error happened", error) }
    );;
  }

  calculateEmploymentDuration(fromDateStr: string, toDateStr: string): string {
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
    let monthPortion = months > 0 ? ' ' + months + ' months' : '';

    return yearPortion + monthPortion;
  }

  calculateTotalYearsExp(): string {
    if (this.employmentHistories) {
      let fromDateStr = this.employmentHistories[this.employmentHistories.length - 1].fromDate;
      let toDateStr = (new Date()).toISOString();

      return this.calculateEmploymentDuration(fromDateStr, toDateStr);
    }
  }

  print() : void {
    window.print(); 
  }
}
